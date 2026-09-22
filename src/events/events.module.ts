import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EventsService } from './events.service';
import { EventsRepository } from './events.repository';
import { EventsController } from './events.controller';

@Module({
  imports: [DatabaseModule],
  providers: [EventsService, EventsRepository],
  controllers: [EventsController],
  exports: [EventsService, EventsRepository],
})
export class EventsModule {}