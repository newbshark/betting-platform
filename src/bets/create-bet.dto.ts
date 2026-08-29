import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateBetDto {
  @IsInt()
  @IsPositive()
  userId!: number;

  @IsInt()
  @IsPositive()
  eventId!: number;

  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsNumber()
  @IsPositive()
  odds!: number;
}
