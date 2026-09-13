import { IsNumber,IsPositive } from "class-validator";

export class CreditAccountDto {
    @IsNumber()
    @IsPositive()
    amount!: number;
}