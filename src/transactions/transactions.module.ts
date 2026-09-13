import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TransactionsRepository } from './transactions.repository';

@Module({
  imports: [DatabaseModule],
  providers: [TransactionsRepository],
  exports: [TransactionsRepository], 
})
export class TransactionsModule {}