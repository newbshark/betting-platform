import { IsString, IsNotEmpty, IsDateString, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsDateString()
  start_time!: string;
}