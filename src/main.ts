import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';
import { AppLoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(AppLoggerService));
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(AppConfigService);

  await app.listen(configService.port, '0.0.0.0');
}
bootstrap();
