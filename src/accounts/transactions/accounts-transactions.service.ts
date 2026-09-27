import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '../accounts.repository';
import { Money } from '../../common/money/money';
import { AccountOperationResponseDto } from './dto/account-operation-response.dto';

@Injectable()
export class AccountsTransactionsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async credit(
    accountId: number,
    amount: number,
  ): Promise<AccountOperationResponseDto> {
    const moneyAmount = new Money(amount);
    const { account, transaction } =
      await this.accountsRepository.creditWithTransaction(accountId, moneyAmount);

    return {
      accountId: account.id,
      newBalance: account.balance,
      transaction: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balance_after,
      },
    };
  }

  async debit(
    accountId: number,
    amount: number,
  ): Promise<AccountOperationResponseDto> {
    const moneyAmount = new Money(amount);
    const { account, transaction } =
      await this.accountsRepository.debitWithTransaction(accountId, moneyAmount);

    return {
      accountId: account.id,
      newBalance: account.balance,
      transaction: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balance_after,
      },
    };
  }
}