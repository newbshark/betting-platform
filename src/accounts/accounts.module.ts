import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountsService } from '../accounts/accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsController } from './accounts.controller';
import { UsersModule } from '../users/users.module';
import { EmailService } from '../common/email-service/EmailService';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [DatabaseModule, UsersModule, TransactionsModule,],
  providers: [AccountsService, AccountsRepository, EmailService],
  controllers: [AccountsController],
  exports: [AccountsService, AccountsRepository], // <-- ДОБАВИТЬ
})
export class AccountsModule {}