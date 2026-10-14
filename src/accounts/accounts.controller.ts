import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async createAccount(@Req() req: any) {
    return this.accountsService.createAccount(req.user.userId);
  }

  @Get(':userId/balance')
  async getBalance(
    @Req() req: any,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    if (req.user.role !== 'admin' && req.user.userId !== userId) {
      throw new ForbiddenException('Cannot view other user balance');
    }
    const balance = await this.accountsService.getBalance(userId);
    return { balance };
  }
}