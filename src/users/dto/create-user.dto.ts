import { roles, users } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto
  implements Omit<users, 'user_id'>, Omit<roles, 'role_id'>
{
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  role: string;
}
