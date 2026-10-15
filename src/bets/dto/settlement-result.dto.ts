export class SettlementResultDto {
  eventId: number;
  settledBets: number;
  wonBets: number;
  lostBets: number;
  cancelledBets: number;
  totalPayout: string;  // только won
  totalRefund: string;  // только void
}