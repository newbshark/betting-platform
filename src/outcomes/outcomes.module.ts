import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EventsModule } from '../events/events.module';
import { OutcomesService } from './outcomes.service';
import { OutcomesRepository } from './outcomes.repository';
import { OutcomesController } from './outcomes.controller';
import { AdminOutcomesController } from './admin-outcomes.controller';

@Module({
  imports: [DatabaseModule, EventsModule],
  providers: [OutcomesService, OutcomesRepository],
  controllers: [OutcomesController, AdminOutcomesController],
  exports: [OutcomesService, OutcomesRepository],
})
export class OutcomesModule {}