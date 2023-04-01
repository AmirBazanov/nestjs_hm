import { PartialType } from '@nestjs/mapped-types';
import { CreateTextBlockDto } from './create-text-block.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTextBlockDto extends PartialType(CreateTextBlockDto) {
  @ApiProperty({ example: 'main-page' })
  @IsOptional()
  @IsString()
  group?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'image.jpeg' })
  image?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'main' })
  search_title?: string;
  @ApiProperty({ example: 'Some interesting text' })
  @IsOptional()
  @IsString()
  text?: string;
  @ApiProperty({ example: 'Title' })
  @IsOptional()
  @IsString()
  title?: string;
}
