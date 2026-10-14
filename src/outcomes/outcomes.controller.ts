import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OutcomesService } from './outcomes.service';

@Controller('events/:eventId/outcomes')
export class OutcomesController {
  constructor(private readonly outcomesService: OutcomesService) {}

  @Get()
  async findByEventId(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.outcomesService.findByEventId(eventId);
  }
}