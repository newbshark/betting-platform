import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AccountsTransactionsService } from './accounts-transactions.service';
import { CreditAccountDto } from './dto/credit-account.dto';
import { DebitAccountDto } from './dto/debit-account.dto';
import { AccountOperationResponseDto } from './dto/account-operation-response.dto';

@Controller('accounts')
export class AccountsTransactionsController {
  constructor(
    private readonly accountsTransactionsService: AccountsTransactionsService,
  ) {}

  @Post(':accountId/credit')
  async credit(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() dto: CreditAccountDto,
  ): Promise<AccountOperationResponseDto> {
    return this.accountsTransactionsService.credit(accountId, dto.amount);
  }

  @Post(':accountId/debit')
  async debit(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() dto: DebitAccountDto,
  ): Promise<AccountOperationResponseDto> {
    return this.accountsTransactionsService.debit(accountId, dto.amount);
  }
}