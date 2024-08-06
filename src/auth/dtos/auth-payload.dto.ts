import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthPayloadDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
