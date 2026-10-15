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

@Controller('admin/events')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminSettlementController {
  constructor(private readonly settlementService: SettlementService) {}

  @Post(':eventId/settle')
  async settleEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() dto: SettleEventDto,
  ): Promise<SettlementResultDto> {
    return this.settlementService.settleEvent(eventId, dto);
  }
}