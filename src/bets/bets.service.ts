import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BetsRepository } from './bets.repository';
import { Bet } from './bet.entity';
import { CreateBetDto } from './dto/create-bet.dto';
import { BetResponseDto } from './dto/bet-response.dto';
import { AccountsService } from '../accounts/accounts.service';
import { OutcomesRepository } from '../outcomes/outcomes.repository';
import { Money } from '../common/money/money';
import { Odds } from '../common/money/odds';

@Injectable()
export class BetsService {
  constructor(
    private readonly betsRepository: BetsRepository,
    private readonly accountsService: AccountsService,
    private readonly outcomesRepository: OutcomesRepository,
  ) {}

  async createBet(dto: CreateBetDto): Promise<BetResponseDto> {
    const outcome = await this.outcomesRepository.findById(dto.outcomeId);
    if (!outcome) {
      throw new NotFoundException(`Outcome with id ${dto.outcomeId} not found`);
    }

    if (outcome.status !== 'open') {
      throw new BadRequestException('Outcome is not open for betting');
    }

   const accountId = await this.accountsService.getPrimaryAccountId(dto.userId);

    // 4. Фиксируем коэффициент и считаем потенциальный выигрыш
    const odds = new Odds(outcome.odds);
    const stake = new Money(dto.stake);
    const potentialPayout = odds.calculatePayout(stake);

    await this.accountsService.debit(accountId, dto.stake);

    const bet = await this.betsRepository.create({
      user_id: dto.userId,
      outcome_id: dto.outcomeId,
      stake: stake.toString(),
      odds: odds.toString(),
      potential_payout: potentialPayout.toString(),
      status: 'PENDING',
    });

    return this.toResponse(bet);
  }

  async getUserBets(userId: number): Promise<BetResponseDto[]> {
    const bets = await this.betsRepository.findByUserId(userId);
    return bets.map((bet) => this.toResponse(bet));
  }

  private toResponse(bet: Bet): BetResponseDto {
    return {
      id: bet.id,
      userId: bet.user_id,
      outcomeId: bet.outcome_id,
      stake: bet.stake,
      odds: bet.odds,
      potentialPayout: bet.potential_payout,
      status: bet.status,
      createdAt: bet.created_at,
    };
  }
}