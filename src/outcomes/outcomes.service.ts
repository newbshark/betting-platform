import { Injectable, NotFoundException } from '@nestjs/common';
import { OutcomesRepository } from './outcomes.repository';
import { Outcome } from './outcome.entity';
import { CreateOutcomeDto } from './dto/create-outcome.dto';
import { EventsRepository } from '../events/events.repository';

@Injectable()
export class OutcomesService {
  constructor(
    private readonly outcomesRepository: OutcomesRepository,
    private readonly eventsRepository: EventsRepository,
  ) {}

  async findByEventId(eventId: number): Promise<Outcome[]> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    return this.outcomesRepository.findByEventId(eventId);
  }

  async create(eventId: number, dto: CreateOutcomeDto): Promise<Outcome> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    return this.outcomesRepository.create({
      event_id: eventId,
      name: dto.name,
      odds: dto.odds.toFixed(2),
      status: 'open',
    });
  }
}