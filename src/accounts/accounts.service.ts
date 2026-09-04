import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { Account } from './account.entity';
import { UsersRepository } from '../users/users.repository';
import { EmailService } from '../common/email-service/EmailService';
import { AppLoggerService } from '../common/logger/logger.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly emailService: EmailService,
    private readonly appLoggerService: AppLoggerService,
  ) {}

  async createAccount(userId: number): Promise<Account> {
    this.appLoggerService.log(
      'Starting account creation process for userId: ' + userId,
    );
    const existingsAccounts =
      await this.accountsRepository.findByUserId(userId);

    if (existingsAccounts && existingsAccounts?.length >= 3) {
      throw new BadRequestException(
        'Maximum number of accounts reached for this user',
      );
    }

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const email = user.email;

    const account = await this.accountsRepository.create(userId);

    this.emailService.sendEmail(
      email,
      'New Account Created',
      `Your new account has been created successfully. Account ID: ${account.id}`,
    );

    this.appLoggerService.log(
      'Finished account creation process for userId: ' + userId,
    );
    return account;
  }
}
