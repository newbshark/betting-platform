import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountsTransactionsService } from './transactions/accounts-transactions.service';
import { CreditAccountDto } from './transactions/dto/credit-account.dto';
import { DebitAccountDto } from './transactions/dto/debit-account.dto';
import { AccountOperationResponseDto } from './transactions/dto/account-operation-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin/accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminAccountsController {
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