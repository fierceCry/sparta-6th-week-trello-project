import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength } from "class-validator";

export class EmailVerificationDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(1)
  @MaxLength(255)
  email: string;
}
