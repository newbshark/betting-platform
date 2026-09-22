import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { BetResponseDto } from './dto/bet-response.dto';

@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  async createBet(@Body() dto: CreateBetDto): Promise<BetResponseDto> {
    return this.betsService.createBet(dto);
  }

  @Get('user/:userId')
  async getUserBets(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<BetResponseDto[]> {
    return this.betsService.getUserBets(userId);
  }
}