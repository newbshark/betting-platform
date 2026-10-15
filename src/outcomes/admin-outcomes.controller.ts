import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OutcomesService } from './outcomes.service';
import { CreateOutcomeDto } from './dto/create-outcome.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin/events/:eventId/outcomes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminOutcomesController {
  constructor(private readonly outcomesService: OutcomesService) {}

  @Post()
  async create(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() dto: CreateOutcomeDto,
  ) {
    return this.outcomesService.create(eventId, dto);
  }
}