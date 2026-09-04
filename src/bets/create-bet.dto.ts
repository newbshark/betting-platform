import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBetDto {
  @IsString()
  @IsPositive()
  userId!: string; // 12332 -> UserRuslan2

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
