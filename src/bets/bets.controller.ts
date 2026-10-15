import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { BetResponseDto } from './dto/bet-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bets')
@UseGuards(JwtAuthGuard)
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  async createBet(
    @Req() req: any,
    @Body() dto: CreateBetDto,
  ): Promise<BetResponseDto> {
    return this.betsService.createBet(dto, req.user.userId);
  }

  @Get('user/:userId')
  async getUserBets(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<BetResponseDto[]> {
    return this.betsService.getUserBets(userId);
  }
}