import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountsModule } from '../accounts/accounts.module';
import { OutcomesModule } from '../outcomes/outcomes.module';
import { BetsService } from './bets.service';
import { BetsRepository } from './bets.repository';
import { BetsController } from './bets.controller';

@Module({
  imports: [DatabaseModule, AccountsModule, OutcomesModule],
  providers: [BetsService, BetsRepository],
  controllers: [BetsController],
  exports: [BetsService, BetsRepository],
})
export class BetsModule {}