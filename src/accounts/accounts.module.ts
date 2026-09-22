import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountsService } from '../accounts/accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsController } from './accounts.controller';
import { UsersModule } from '../users/users.module';
import { EmailService } from '../common/email-service/EmailService';


@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [AccountsService, AccountsRepository, EmailService],
  controllers: [AccountsController],
  exports: [AccountsService, AccountsRepository], 
})
export class AccountsModule {}