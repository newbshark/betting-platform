import { Module } from '@nestjs/common';
import { AccountsModule } from '../accounts.module';
import { AccountsTransactionsService } from './accounts-transactions.service';
import { AccountsTransactionsController } from './accounts-transactions.controller';

@Module({
  imports: [AccountsModule], // получаем AccountsRepository через экспорт
  providers: [AccountsTransactionsService],
  controllers: [AccountsTransactionsController],
  exports: [AccountsTransactionsService], // нужно для BetsService
})
export class AccountsTransactionsModule {}