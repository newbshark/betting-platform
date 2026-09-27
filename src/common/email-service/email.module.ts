import { Global, Module } from '@nestjs/common';
import { EmailService } from './EmailService';

@Global()
@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}