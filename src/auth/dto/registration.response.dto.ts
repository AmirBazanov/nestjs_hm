import { profiles, users } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UserResponse implements Omit<users, 'refresh_token' | 'password'> {
  @ApiProperty({ example: 12 })
  @IsNumber()
  user_id: number;
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'Admin' })
  @IsString()
  role: string;
}

export class RegistrationResponseDto implements Omit<profiles, 'user_id'> {
  @ApiProperty({ example: 12 })
  @IsNumber()
  profile_id: number;
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
    examples: ['test@gmail.com'],
    type: () => UserResponse,
  })
  @ValidateNested({ each: true })
  @Type(() => UserResponse)
  user: UserResponse;
}
