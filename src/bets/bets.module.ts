import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountsModule } from '../accounts/accounts.module';
import { OutcomesModule } from '../outcomes/outcomes.module';
import { BetsService } from './bets.service';
import { BetsRepository } from './bets.repository';
import { BetsController } from './bets.controller';
import { SettlementService } from './settlement.service';
import { SettlementRepository } from './settlement.repository';
import { AdminSettlementController } from './admin-settlement.controller';

@Module({
  imports: [
    DatabaseModule,
    AccountsModule,
    OutcomesModule,
  ],
  providers: [
    BetsService,
    BetsRepository,
    SettlementService,
    SettlementRepository,
  ],
  controllers: [BetsController, AdminSettlementController],
  exports: [BetsService, BetsRepository, SettlementService],
})
export class BetsModule {}