import { users } from '@prisma/client';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto
  implements Omit<users, 'user_id' | 'refresh_token' | 'role'>
{
  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  email: string;
  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}
