import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountsService } from '../accounts/accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsController } from './accounts.controller';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [AccountsService, AccountsRepository],
  controllers: [AccountsController],
  exports: [AccountsService, AccountsRepository],
})
export class AccountsModule {}