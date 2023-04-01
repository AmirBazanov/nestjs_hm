import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty({ example: 'I like watch some movies' })
  @IsString()
  bio: string;
  @ApiProperty({ example: 'Tom' })
  @IsString()
  first_name: string;
  @IsString()
  phone_number: string;
  @ApiProperty({ example: 'Petrovich' })
  @IsString()
  second_name: string;
  @ApiProperty({ example: 'Hardy' })
  @IsString()
  surname: string;
}
