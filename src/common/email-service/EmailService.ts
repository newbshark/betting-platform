import { Injectable } from '@nestjs/common';
import { AppLoggerService } from '../logger/logger.service';

@Injectable()
export class EmailService {
  constructor(private readonly appLoggerService: AppLoggerService) {}

  sendEmail(receiver: string, subject: string, body: string): void {
    // Implement your email sending logic here
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    this.appLoggerService.log(
      'Sending email to: ' +
        receiver +
        ' with subject: ' +
        subject +
        ' and body: ' +
        body,
    );
  }
}
