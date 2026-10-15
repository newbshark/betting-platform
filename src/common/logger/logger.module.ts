import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from '../config/config.module';
import { AppLoggerService } from './logger.service';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class LoggerModule {}
