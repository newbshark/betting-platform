import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateBetDto {
  @IsInt()
  @IsPositive()
  outcomeId: number;

  @IsNumber()
  @IsPositive()
  stake: number;
}