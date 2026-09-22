export interface Bet {
  id: number;
  user_id: number;
  outcome_id: number;
  stake: string;
  odds: string;
  potential_payout: string;
  status: 'PENDING' | 'WON' | 'LOST' | 'CANCELLED';
  created_at: Date;
  updated_at: Date;
}