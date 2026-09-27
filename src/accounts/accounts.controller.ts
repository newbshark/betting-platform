import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  async createAccount(@Body() dto: CreateAccountDto) {
    return this.accountsService.createAccount(dto.userId);
  }

  @Get(':userId/balance')
  async getBalance(@Param('userId', ParseIntPipe) userId: number) {
    const balance = await this.accountsService.getBalance(userId);
    return { balance };
  }
}