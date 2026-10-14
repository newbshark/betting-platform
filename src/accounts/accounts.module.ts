import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsController } from './accounts.controller';
import { AdminAccountsController } from './admin-accounts.controller';
import { AccountsTransactionsService } from './transactions/accounts-transactions.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [
    AccountsService,
    AccountsRepository,
    AccountsTransactionsService,
  ],
  controllers: [AccountsController, AdminAccountsController],
  exports: [AccountsService, AccountsRepository, AccountsTransactionsService],
})
export class AccountsModule {}