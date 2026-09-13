export class AccountOperationResponseDto {
  accountId!: number;
  newBalance!: string;
  transaction!: {
    id: number;
    type: 'CREDIT' | 'DEBIT';
    amount: string;
  };
}