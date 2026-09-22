export interface Outcome {
  id: number;
  event_id: number;
  name: string;
  odds: string;
  status: 'open' | 'won' | 'lost' | 'void';
  created_at: Date;
  updated_at: Date;
}