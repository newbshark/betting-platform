import { Injectable } from '@nestjs/common';
import { SettlementRepository } from './settlement.repository';
import { SettleEventDto } from './dto/settle-event.dto';
import { SettlementResultDto } from './dto/settlement-result.dto';

@Injectable()
export class SettlementService {
  constructor(private readonly settlementRepository: SettlementRepository) {}

  async settleEvent(
    eventId: number,
    dto: SettleEventDto,
  ): Promise<SettlementResultDto> {
    return this.settlementRepository.settleEvent(eventId, dto.outcomes);
  }
}