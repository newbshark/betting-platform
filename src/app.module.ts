import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BetsModule } from './bets/bets.module';
import { AppConfigModule } from './common/config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './common/logger/logger.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { AccountsTransactionsModule } from './accounts/transactions/accounts-transactions.module';
import { EventsModule } from './events/events.module';
import { OutcomesModule } from './outcomes/outcomes.module';
import { EmailModule } from './common/email-service/email.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    EmailModule,
    EventsModule,
    AccountsModule,
    AccountsTransactionsModule,
    OutcomesModule,
    BetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}