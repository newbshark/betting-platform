import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: AppConfigService) {
    this.logger = winston.createLogger({
      level: this.configService.logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      defaultMeta: { service: 'betting-platform' },
      transports: [new winston.transports.Console()],
    });
  }

  log(message: unknown, context?: string): void {
    this.logger.info(this.toMessage(message), { context });
  }

  error(message: unknown, trace?: string, context?: string): void {
    this.logger.error(this.toMessage(message), { trace, context });
  }

  warn(message: unknown, context?: string): void {
    this.logger.warn(this.toMessage(message), { context });
  }

  debug(message: unknown, context?: string): void {
    this.logger.debug(this.toMessage(message), { context });
  }

  verbose(message: unknown, context?: string): void {
    this.logger.verbose(this.toMessage(message), { context });
  }

  private toMessage(message: unknown): string {
    return message instanceof Error
      ? message.message
      : typeof message === 'string'
        ? message
        : JSON.stringify(message);
  }
}
