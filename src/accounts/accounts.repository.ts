import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Account } from './account.entity';
import { Transaction } from '../transactions/transaction.entity'; 
import { Money } from '../common/money/money';

@Injectable()
export class AccountsRepository {
  private static readonly TABLE_NAME = 'accounts';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) { }

  async findByUserId(userId: number): Promise<Account[] | undefined> {
    return this.knex<Account>(AccountsRepository.TABLE_NAME).where({
      user_id: userId,
    });
  }

  async findById(id: number): Promise<Account | undefined> {
    return this.knex<Account>(AccountsRepository.TABLE_NAME)
      .where({ id })
      .first();
  }

  async create(userId: number): Promise<Account> {
    const [account] = await this.knex<Account>(AccountsRepository.TABLE_NAME)
      .insert({
        user_id: userId,
        balance: '0.00',
      })
      .returning('*');
    return account;
  }

  async getBalance(accountId: number): Promise<Money> {
    const account = await this.findById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return new Money(account.balance);
  }

  async lockForUpdate(accountId: number, trx: Knex.Transaction): Promise<Account> {
    const account = await trx<Account>(AccountsRepository.TABLE_NAME)
      .where({ id: accountId })
      .forUpdate()
      .first();

    if (!account) {
      throw new Error(`Account with id ${accountId} not found`);
    }

    return account;
  }

  async updateBalance(
    accountId: number,
    newBalance: Money,
    trx: Knex.Transaction,
  ): Promise<Account> {
    const [updated] = await trx<Account>(AccountsRepository.TABLE_NAME)
      .where({ id: accountId })
      .update({
        balance: newBalance.toString(),
        updated_at: new Date(),
      })
      .returning('*');

    return updated;
  }

  async creditWithTransaction(
  accountId: number,
  amount: Money,
): Promise<{ account: Account; transaction: Transaction }> {
  // 1. Открываем транзакцию
  const trx = await this.knex.transaction();

  try {
    // 2. Блокируем счёт (FOR UPDATE)
    const account = await this.lockForUpdate(accountId, trx);

    // 3. Вычисляем новый баланс
    const currentBalance = new Money(account.balance);
    const newBalance = currentBalance.add(amount);

    // 4. Обновляем баланс
    const updatedAccount = await this.updateBalance(accountId, newBalance, trx);

    // 5. Создаём запись в transactions
    const [transaction] = await trx<Transaction>('transactions')
      .insert({
        account_id: accountId,
        type: 'CREDIT',
        amount: amount.toString(),
        balance_after: newBalance.toString(),
        description: `Credit ${amount.toString()} to account ${accountId}`,
      })
      .returning('*');

    // 6. Коммитим
    await trx.commit();

    return { account: updatedAccount, transaction };
  } catch (error) {
    // 7. При ошибке откатываем
    await trx.rollback();
    throw error;
  }
}

async debitWithTransaction(
  accountId: number,
  amount: Money,
): Promise<{ account: Account; transaction: Transaction }> {
  const trx = await this.knex.transaction();

  try {
    const account = await this.lockForUpdate(accountId, trx);

    const currentBalance = new Money(account.balance);

    // Проверяем баланс
    if (currentBalance.compareTo(amount) < 0) {
      throw new BadRequestException('Insufficient balance');
    }

    const newBalance = currentBalance.subtract(amount);

    const updatedAccount = await this.updateBalance(accountId, newBalance, trx);

    const [transaction] = await trx<Transaction>('transactions')
      .insert({
        account_id: accountId,
        type: 'DEBIT',
        amount: amount.toString(),
        balance_after: newBalance.toString(),
        description: `Debit ${amount.toString()} from account ${accountId}`,
      })
      .returning('*');

    await trx.commit();

    return { account: updatedAccount, transaction };
  } catch (error) {
    await trx.rollback();
    throw error;
  }
}
}
