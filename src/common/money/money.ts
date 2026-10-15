import { Decimal } from 'decimal.js';

export class Money {
  private readonly value: Decimal;

  constructor(amount: string | number | Decimal) {
    this.value = new Decimal(amount);
  }

  add(other: Money): Money {
    return new Money(this.value.plus(other.value));
  }

  subtract(other: Money): Money {
    return new Money(this.value.minus(other.value));
  }

  multiply(factor: number | Money | Decimal): Money {
    return new Money(this.value.times(factor instanceof Money ? factor.value : factor));
  }

  divide(divisor: number | Money | Decimal): Money {
    return new Money(this.value.dividedBy(divisor instanceof Money ? divisor.value : divisor));
  }

  compareTo(other: Money): number {
    return this.value.comparedTo(other.value);
  }

  isZero(): boolean {
    return this.value.isZero();
  }

  isPositive(): boolean {
    return this.value.isPositive();
  }

  isNegative(): boolean {
    return this.value.isNegative();
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

  static fromNumber(amount: number): Money {
    return new Money(amount);
  }

  static zero(): Money {
    return new Money(0);
  }
}