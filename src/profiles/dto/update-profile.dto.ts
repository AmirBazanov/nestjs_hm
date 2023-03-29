import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsString } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsString()
  bio: string;
  @IsString()
  first_name: string;
  @IsString()
  phone_number: string;
  @IsString()
  second_name: string;
  @IsString()
  surname: string;
}
