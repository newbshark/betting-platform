import { IsInt, IsPositive } from 'class-validator';

export class CreateAccountDto {
  @IsInt()
  @IsPositive()
  userId!: number;
}