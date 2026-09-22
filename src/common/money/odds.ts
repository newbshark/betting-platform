import { Decimal } from 'decimal.js';
import { Money } from './money';

export class Odds {
  private readonly value: Decimal;

  constructor(odds: string | number | Decimal) {
    this.value = new Decimal(odds);
  }

  calculatePayout(stake: Money): Money {
    return stake.multiply(this.value);
  }

  toNumber(): number {
    return this.value.toNumber();
  }

  toString(): string {
    return this.value.toString();
  }

  toFixed(decimals: number = 2): string {
    return this.value.toFixed(decimals);
  }

}