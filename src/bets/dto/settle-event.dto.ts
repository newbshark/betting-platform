import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsIn,
  IsInt,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class OutcomeResultDto {
  @IsInt()
  @IsPositive()
  outcomeId!: number;

  @IsIn(['won', 'lost', 'void'])
  result!: 'won' | 'lost' | 'void';
}

export class SettleEventDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OutcomeResultDto)
  outcomes!: OutcomeResultDto[];
}