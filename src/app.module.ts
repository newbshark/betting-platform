import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BetsModule } from './bets/bets.module';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    DatabaseModule,
    UsersModule,
    BetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
