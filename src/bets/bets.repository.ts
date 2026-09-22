import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Bet } from './bet.entity';

@Injectable()
export class BetsRepository {
  private static readonly TABLE_NAME = 'bets';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async findById(id: number): Promise<Bet | undefined> {
    return this.knex<Bet>(BetsRepository.TABLE_NAME).where({ id }).first();
  }

  async findByUserId(userId: number): Promise<Bet[]> {
    return this.knex<Bet>(BetsRepository.TABLE_NAME)
      .where({ user_id: userId })
      .orderBy('created_at', 'desc');
  }

  async create(data: {
    user_id: number;
    outcome_id: number;
    stake: string;
    odds: string;
    potential_payout: string;
    status: 'PENDING' | 'WON' | 'LOST' | 'CANCELLED';
  }): Promise<Bet> {
    const [bet] = await this.knex<Bet>(BetsRepository.TABLE_NAME)
      .insert(data)
      .returning('*');
    return bet;
  }
}