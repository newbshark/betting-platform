import { Controller, Post, Body, Get, Param, BadRequestException } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './create-account.dto';
import { Money } from '../common/money/money';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.createAccount(createAccountDto.userId);
  }

  @Get(':userId/balance')
  async getBalance(@Param('userId') userId: string) {
    const balance = await this.accountsService.getBalance(Number(userId));
    return {
      userId: Number(userId),
      balance: balance.toString(),
    };
  }

  @Post(':accountId/credit')
  async credit(
    @Param('accountId') accountId: string,
    @Body('amount') amount: string,
  ) {
    const accountIdNum = parseInt(accountId, 10);
    if (isNaN(accountIdNum) || accountIdNum <= 0) {
      throw new BadRequestException('Invalid accountId');
    }
    if (!amount) {
      throw new BadRequestException('Amount is required');
    }

    const moneyAmount = new Money(amount);
    const result = await this.accountsService.credit(accountIdNum, moneyAmount);

    return {
      accountId: accountIdNum,
      newBalance: result.account.balance,
      transaction: result.transaction,
    };
  }

  @Post(':accountId/debit')
  async debit(
    @Param('accountId') accountId: string,
    @Body('amount') amount: string,
  ) {
    const accountIdNum = parseInt(accountId, 10);
    if (isNaN(accountIdNum) || accountIdNum <= 0) {
      throw new BadRequestException('Invalid accountId');
    }
    if (!amount) {
      throw new BadRequestException('Amount is required');
    }

    const moneyAmount = new Money(amount);
    const result = await this.accountsService.debit(accountIdNum, moneyAmount);

    return {
      accountId: accountIdNum,
      newBalance: result.account.balance,
      transaction: result.transaction,
    };
  }
}