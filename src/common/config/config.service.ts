import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

@Injectable()
export class AppConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get nodeEnv(): string {
    return this.nestConfigService.get<string>('NODE_ENV', 'development');
  }

  get port(): number {
    return this.nestConfigService.get<number>('PORT', 3000);
  }

  get logLevel(): string {
    return this.nestConfigService.get<string>('LOG_LEVEL', 'info');
  }

  get database(): DatabaseConfig {
    return {
      host: this.nestConfigService.get<string>('DATABASE_HOST', 'localhost'),
      port: this.nestConfigService.get<number>('DATABASE_PORT', 5432),
      user: this.nestConfigService.get<string>('DATABASE_USER', 'postgres'),
      password: this.nestConfigService.get<string>(
        'DATABASE_PASSWORD',
        'postgres',
      ),
      database: this.nestConfigService.get<string>(
        'DATABASE_NAME',
        'betting_platform',
      ),
    };
  }
}
