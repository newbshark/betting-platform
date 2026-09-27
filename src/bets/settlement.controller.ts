import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SettlementService } from './settlement.service';
import { SettleEventDto } from './dto/settle-event.dto';
import { SettlementResultDto } from './dto/settlement-result.dto';

@Controller('events')
export class SettlementController {
  constructor(private readonly settlementService: SettlementService) {}

  @Post(':eventId/settle')
  async settleEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() dto: SettleEventDto,
  ): Promise<SettlementResultDto> {
    return this.settlementService.settleEvent(eventId, dto);
  }
}