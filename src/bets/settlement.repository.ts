import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Money } from '../common/money/money';
import { OutcomeResultDto } from './dto/settle-event.dto';
import { SettlementResultDto } from './dto/settlement-result.dto';

interface BetRow {
    id: number;
    user_id: number;
    outcome_id: number;
    stake: string;
    potential_payout: string;
    status: 'PENDING' | 'WON' | 'LOST' | 'CANCELLED';
}

@Injectable()
export class SettlementRepository {
    constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) { }

    async settleEvent(
        eventId: number,
        results: OutcomeResultDto[],
    ): Promise<SettlementResultDto> {
        const trx = await this.knex.transaction();

        try {
            // 1. Проверяем, что событие существует и не settled
            const event = await trx('events').where({ id: eventId }).first();
            if (!event) {
                throw new BadRequestException(`Event ${eventId} not found`);
            }
            if (event.status === 'settled') {
                throw new BadRequestException(`Event ${eventId} is already settled`);
            }

            // 2. Обновляем статусы исходов
            for (const r of results) {
                const updated = await trx('outcomes')
                    .where({ id: r.outcomeId, event_id: eventId })
                    .update({ status: r.result, updated_at: new Date() });

                if (!updated) {
                    throw new BadRequestException(
                        `Outcome ${r.outcomeId} does not belong to event ${eventId}`,
                    );
                }
            }

            // 3. Забираем все PENDING-ставки по исходам этого события
            const outcomeIds = results.map((r) => r.outcomeId);

            const bets = await trx<BetRow>('bets')
                .whereIn('outcome_id', outcomeIds)
                .andWhere({ status: 'PENDING' })
                .forUpdate();

            // Карта: outcomeId -> result
            const resultByOutcome = new Map<number, 'won' | 'lost' | 'void'>();
            for (const r of results) {
                resultByOutcome.set(r.outcomeId, r.result);
            }

            let wonBets = 0;
            let lostBets = 0;
            let cancelledBets = 0;
            let totalPayout = Money.zero();
            let totalRefund = Money.zero();

            // 4. Обрабатываем каждую ставку
            for (const bet of bets) {
                const result = resultByOutcome.get(bet.outcome_id);

                if (result === 'won') {
                    // Начисляем potential_payout на основной счёт пользователя
                    const account = await trx('accounts')
                        .where({ user_id: bet.user_id })
                        .orderBy('id', 'asc')
                        .forUpdate()
                        .first();

                    if (!account) {
                        throw new BadRequestException(
                            `No account for user ${bet.user_id}`,
                        );
                    }

                    const current = new Money(account.balance);
                    const payout = new Money(bet.potential_payout);
                    const newBalance = current.add(payout);

                    await trx('accounts')
                        .where({ id: account.id })
                        .update({
                            balance: newBalance.toFixed(2),
                            updated_at: new Date(),
                        });

                    await trx('transactions').insert({
                        account_id: account.id,
                        type: 'CREDIT',
                        amount: payout.toFixed(2),
                        balance_after: newBalance.toFixed(2),
                        description: `Payout for bet ${bet.id} (event ${eventId})`,
                    });

                    await trx('bets')
                        .where({ id: bet.id })
                        .update({ status: 'WON', updated_at: new Date() });

                    totalPayout = totalPayout.add(payout);
                    wonBets++;
                } else if (result === 'lost') {
                    await trx('bets')
                        .where({ id: bet.id })
                        .update({ status: 'LOST', updated_at: new Date() });
                    lostBets++;
                } else if (result === 'void') {
                    // Возврат stake
                    const account = await trx('accounts')
                        .where({ user_id: bet.user_id })
                        .orderBy('id', 'asc')
                        .forUpdate()
                        .first();

                    if (!account) {
                        throw new BadRequestException(
                            `No account for user ${bet.user_id}`,
                        );
                    }

                    const current = new Money(account.balance);
                    const refund = new Money(bet.stake);
                    const newBalance = current.add(refund);

                    await trx('accounts')
                        .where({ id: account.id })
                        .update({
                            balance: newBalance.toFixed(2),
                            updated_at: new Date(),
                        });

                    await trx('transactions').insert({
                        account_id: account.id,
                        type: 'CREDIT',
                        amount: refund.toFixed(2),
                        balance_after: newBalance.toFixed(2),
                        description: `Refund for void bet ${bet.id} (event ${eventId})`,
                    });

                    await trx('bets')
                        .where({ id: bet.id })
                        .update({ status: 'CANCELLED', updated_at: new Date() });

                    totalRefund = totalRefund.add(refund);   // ← новая строка
                    cancelledBets++;
                }
            }
                // 5. Помечаем событие как settled
                await trx('events')
                    .where({ id: eventId })
                    .update({ status: 'settled', updated_at: new Date() });

                await trx.commit();

                return {
                    eventId,
                    settledBets: bets.length,
                    wonBets,
                    lostBets,
                    cancelledBets,
                    totalPayout: totalPayout.toFixed(2),
                    totalRefund: totalRefund.toFixed(2),
                };
            } catch (error) {
                await trx.rollback();
                throw error;
            }
        }
    }
