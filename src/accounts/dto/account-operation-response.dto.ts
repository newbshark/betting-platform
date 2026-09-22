
export class TransactionResponseDto {
  id!: number;
  type!: 'CREDIT' | 'DEBIT';
  amount!: string;
  balanceAfter!: string;
}

export class AccountOperationResponseDto {
  accountId!: number;
  newBalance!: string;
  transaction!: TransactionResponseDto;
}