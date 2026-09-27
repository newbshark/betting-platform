import { IsNumber, IsPositive } from 'class-validator';

export class DebitAccountDto {
  @IsNumber()
  @IsPositive()
  amount!: number;
}