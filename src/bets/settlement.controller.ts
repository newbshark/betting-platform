import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SettlementService } from './settlement.service';
import { SettleEventDto } from './dto/settle-event.dto';
import { SettlementResultDto } from './dto/settlement-result.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('events')
export class SettlementController {
  constructor(private readonly settlementService: SettlementService) {}

  @Post(':eventId/settle')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async settleEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() dto: SettleEventDto,
  ): Promise<SettlementResultDto> {
    return this.settlementService.settleEvent(eventId, dto);
  }
}