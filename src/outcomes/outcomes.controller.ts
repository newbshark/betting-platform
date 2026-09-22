import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OutcomesService } from './outcomes.service';
import { CreateOutcomeDto } from './dto/create-outcome.dto';

@Controller('events/:eventId/outcomes')
export class OutcomesController {
  constructor(private readonly outcomesService: OutcomesService) {}

  @Get()
  async findByEventId(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.outcomesService.findByEventId(eventId);
  }

  @Post()
  async create(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() dto: CreateOutcomeDto,
  ) {
    return this.outcomesService.create(eventId, dto);
  }
}