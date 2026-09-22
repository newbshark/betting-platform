import { IsNumber, IsPositive, IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateOutcomeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(1.01)
  odds!: number;
}