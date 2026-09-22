import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.findAll();
  }

  async findById(id: number): Promise<Event> {
    const event = await this.eventsRepository.findById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  async create(dto: CreateEventDto): Promise<Event> {
    return this.eventsRepository.create({
      name: dto.name,
      start_time: new Date(dto.start_time),
      status: 'scheduled',
    });
  }
}