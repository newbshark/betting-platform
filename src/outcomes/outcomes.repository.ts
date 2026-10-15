import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Outcome } from './outcome.entity';

type OutcomeStatus = 'open' | 'won' | 'lost' | 'void';

@Injectable()
export class OutcomesRepository {
  private static readonly TABLE_NAME = 'outcomes';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async findByEventId(eventId: number): Promise<Outcome[]> {
    return this.knex<Outcome>(OutcomesRepository.TABLE_NAME)
      .where({ event_id: eventId })
      .orderBy('id', 'asc');
  }

  async findById(id: number): Promise<Outcome | undefined> {
    return this.knex<Outcome>(OutcomesRepository.TABLE_NAME).where({ id }).first();
  }

  async create(data: {
    event_id: number;
    name: string;
    odds: string;
    status?: OutcomeStatus;
  }): Promise<Outcome> {
    const [outcome] = await this.knex<Outcome>(OutcomesRepository.TABLE_NAME)
      .insert({
        event_id: data.event_id,
        name: data.name,
        odds: data.odds,
        status: data.status ?? 'open',
      })
      .returning('*');
    return outcome;
  }
}