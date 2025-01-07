import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { userRole } from './user-role-enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  phone_number: string;

  @IsEnum(userRole)
  role: userRole;
}
