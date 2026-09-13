// src/accounts/accounts.controller.ts
import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreditAccountDto } from './dto/credit-account.dto';
import { DebitAccountDto } from './dto/debit-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async createAccount(@Body() dto: CreateAccountDto) {
    return this.accountsService.createAccount(dto.userId);
  }

  @Get(':userId/balance')
  async getBalance(@Param('userId', ParseIntPipe) userId: number) {
    return this.accountsService.getBalance(userId);
  }

  @Post(':accountId/credit')
  async credit(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() dto: CreditAccountDto,
  ) {
    return this.accountsService.credit(accountId, dto.amount);
  }

  @Post(':accountId/debit')
  async debit(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() dto: DebitAccountDto,
  ) {
    return this.accountsService.debit(accountId, dto.amount);
  }
}