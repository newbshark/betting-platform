import {
  BadRequestException,
  Injectable, NotFoundException
} from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { Account } from './account.entity';
import { UsersRepository } from '../users/users.repository';
import { EmailService } from '../common/email-service/EmailService';
import { AppLoggerService } from '../common/logger/logger.service';
import { Knex } from 'knex';
import { Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Money } from '../common/money/money';
import { TransactionsRepository } from '../transactions/transactions.repository';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly emailService: EmailService,
    private readonly appLoggerService: AppLoggerService,
    private readonly transactionsRepository: TransactionsRepository,
    @Inject(KNEX_CONNECTION) private readonly knex: Knex,
  ) { }

  async createAccount(userId: number): Promise<Account> {
    this.appLoggerService.log(
      'Starting account creation process for userId: ' + userId,
    );
    const existingsAccounts =
      await this.accountsRepository.findByUserId(userId);

    if (existingsAccounts && existingsAccounts?.length >= 3) {
      throw new BadRequestException(
        'Maximum number of accounts reached for this user',
      );
    }

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const email = user.email;

    const account = await this.accountsRepository.create(userId);

    this.emailService.sendEmail(
      email,
      'New Account Created',
      `Your new account has been created successfully. Account ID: ${account.id}`,
    );

    this.appLoggerService.log(
      'Finished account creation process for userId: ' + userId,
    );
    return account;
  }
  async getBalance(userId: number): Promise<Money> {

    const accounts = await this.accountsRepository.findByUserId(userId);
    if (!accounts || accounts.length === 0) {
      throw new NotFoundException(`No accounts found for user ${userId}`);
    }
    return new Money(accounts[0].balance);
  }


  async debit(
    accountId: number,
    amount: Money,
  ): Promise<{ account: Account; transaction: any }> {
    const trx = await this.knex.transaction();

    try {

      const account = await this.accountsRepository.lockForUpdate(accountId, trx);

      // Проверяем баланс
      const currentBalance = new Money(account.balance);
      if (currentBalance.compareTo(amount) < 0) {
        throw new BadRequestException('Insufficient balance');
      }


      const newBalance = currentBalance.subtract(amount);


      const updatedAccount = await this.accountsRepository.updateBalance(
        accountId,
        newBalance,
        trx,
      );


      const transaction = { id: 1, type: 'DEBIT', amount: amount.toString() };

      await trx.commit();

      return { account: updatedAccount, transaction };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }


  async credit(
    accountId: number,
    amount: Money,
  ): Promise<{ account: Account; transaction: any }> {
    const trx = await this.knex.transaction();

    try {
      const account = await this.accountsRepository.lockForUpdate(accountId, trx);

      const currentBalance = new Money(account.balance);
      const newBalance = currentBalance.add(amount);

      const updatedAccount = await this.accountsRepository.updateBalance(
        accountId,
        newBalance,
        trx,
      );

      const transaction = { id: 1, type: 'CREDIT', amount: amount.toString() };

      await trx.commit();

      return { account: updatedAccount, transaction };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}