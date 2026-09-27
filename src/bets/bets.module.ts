import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountsModule } from '../accounts/accounts.module';
import { AccountsTransactionsModule } from '../accounts/transactions/accounts-transactions.module';
import { OutcomesModule } from '../outcomes/outcomes.module';
import { BetsService } from './bets.service';
import { BetsRepository } from './bets.repository';
import { BetsController } from './bets.controller';
import { SettlementService } from './settlement.service';
import { SettlementRepository } from './settlement.repository';
import { SettlementController } from './settlement.controller';

@Module({
  imports: [
    DatabaseModule,
    AccountsModule,
    AccountsTransactionsModule,
    OutcomesModule,
  ],
  providers: [
    BetsService,
    BetsRepository,
    SettlementService,
    SettlementRepository,
  ],
  controllers: [BetsController, SettlementController],
  exports: [BetsService, BetsRepository, SettlementService],
})
export class BetsModule {}