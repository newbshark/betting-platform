export interface Event {
  id: number;
  name: string;
  start_time: Date;
  status: 'scheduled' | 'closed' | 'settled' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}