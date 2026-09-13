import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsRepository {
  private static readonly TABLE_NAME = 'transactions';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async create(
    accountId: number,
    type: 'CREDIT' | 'DEBIT',
    amount: string,
    balanceAfter: string,
    trx: Knex.Transaction,
    description?: string,
  ): Promise<Transaction> {
    const [transaction] = await trx<Transaction>(
      TransactionsRepository.TABLE_NAME,
    )
      .insert({
        account_id: accountId,
        type,
        amount,
        balance_after: balanceAfter,
        description,
      })
      .returning('*');

    return transaction;
  }

  async findByAccountId(accountId: number): Promise<Transaction[]> {
    return this.knex<Transaction>(TransactionsRepository.TABLE_NAME)
      .where({ account_id: accountId })
      .orderBy('created_at', 'desc');
  }
}