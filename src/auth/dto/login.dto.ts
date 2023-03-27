import { users } from '@prisma/client';
import { IsString } from 'class-validator';

export class LoginDto implements Omit<users, 'user_id'> {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
