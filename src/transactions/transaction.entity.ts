export interface Transaction {
  id: number;
  account_id: number;
  type: 'CREDIT' | 'DEBIT';
  amount: string;
  balance_after: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}