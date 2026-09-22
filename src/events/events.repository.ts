// src/events/events.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Event } from './event.entity';

type EventStatus = 'scheduled' | 'closed' | 'settled' | 'cancelled';

@Injectable()
export class EventsRepository {
  private static readonly TABLE_NAME = 'events';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async findAll(): Promise<Event[]> {
    return this.knex<Event>(EventsRepository.TABLE_NAME)
      .select('*')
      .orderBy('start_time', 'desc');
  }

  async findById(id: number): Promise<Event | undefined> {
    return this.knex<Event>(EventsRepository.TABLE_NAME).where({ id }).first();
  }

  async create(data: {
    name: string;
    start_time: Date;
    status?: EventStatus;
  }): Promise<Event> {
    const [event] = await this.knex<Event>(EventsRepository.TABLE_NAME)
      .insert({
        name: data.name,
        start_time: data.start_time,
        status: data.status ?? 'scheduled',
      })
      .returning('*');
    return event;
  }

  async updateStatus(id: number, status: EventStatus): Promise<Event | undefined> {
    const [event] = await this.knex<Event>(EventsRepository.TABLE_NAME)
      .where({ id })
      .update({ status, updated_at: new Date() })
      .returning('*');
    return event;
  }
}