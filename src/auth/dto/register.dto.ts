import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @MinLength(8)
  password: string;
}