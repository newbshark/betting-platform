import {
  BadRequestException,
  Injectable, NotFoundException
} from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { Account } from './account.entity';
import { UsersRepository } from '../users/users.repository';
import { EmailService } from '../common/email-service/EmailService';
import { AppLoggerService } from '../common/logger/logger.service';
import { Inject } from '@nestjs/common';
import { Money } from '../common/money/money';
import { AccountOperationResponseDto } from './dto/account-operation-response.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly emailService: EmailService,
    private readonly appLoggerService: AppLoggerService,
  ) { }

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
  async getBalance(userId: number): Promise<Money> {

    const accounts = await this.accountsRepository.findByUserId(userId);
    if (!accounts || accounts.length === 0) {
      throw new NotFoundException(`No accounts found for user ${userId}`);
    }
    return new Money(accounts[0].balance);
  }


  async credit(
    accountId: number,
    amount: number,
  ): Promise<AccountOperationResponseDto> {
    const moneyAmount = new Money(amount);
    const { account, transaction } = await this.accountsRepository.creditWithTransaction(
      accountId,
      moneyAmount,
    );

    return {
      accountId: account.id,
      newBalance: account.balance,
      transaction: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balance_after,
      },
    };
  }

  async debit(
    accountId: number,
    amount: number,
  ): Promise<AccountOperationResponseDto> {
    const moneyAmount = new Money(amount);
    const { account, transaction } = await this.accountsRepository.debitWithTransaction(
      accountId,
      moneyAmount,
    );

    return {
      accountId: account.id,
      newBalance: account.balance,
      transaction: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balance_after,
      },
    };
  }
}