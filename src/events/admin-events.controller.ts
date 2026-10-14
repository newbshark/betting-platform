import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin/events')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminEventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }
}