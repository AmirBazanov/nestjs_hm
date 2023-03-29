import { profiles, users } from '@prisma/client';
import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class User implements Omit<users, 'user_id' | 'refresh_token' | 'role'> {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}

export class RegistrationDto
  implements Omit<profiles, 'profile_id' | 'user_id'>
{
  @ApiProperty()
  @IsString()
  first_name: string;
  @ApiProperty()
  @IsString()
  second_name: string;
  @ApiProperty()
  @IsString()
  surname: string;
  @ApiProperty()
  @IsString()
  phone_number: string;
  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => User)
  user: User;
}
