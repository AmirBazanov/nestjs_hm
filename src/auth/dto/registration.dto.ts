import { profiles, users } from '@prisma/client';
import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class User implements Omit<users, 'user_id' | 'refresh_token' | 'role'> {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}

export class RegistrationDto
  implements Omit<profiles, 'profile_id' | 'user_id'>
{
  @ApiProperty({ example: 'Tom' })
  @IsString()
  first_name: string;
  @ApiProperty({ example: 'Petrovich' })
  @IsString()
  second_name: string;
  @ApiProperty({ example: 'Hardy' })
  @IsString()
  surname: string;
  @ApiProperty({ example: '+79082234545' })
  @IsString()
  phone_number: string;
  @ApiProperty({ example: 'I like watch some movies' })
  @IsString()
  bio: string;

  @ApiProperty({
    examples: ['test@gmail.com', 'password123'],
    type: () => User,
  })
  @ValidateNested({ each: true })
  @Type(() => User)
  user: User;
}
