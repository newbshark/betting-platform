import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Account } from './account.entity';

@Injectable()
export class AccountsRepository {
  private static readonly TABLE_NAME = 'accounts';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

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
}
