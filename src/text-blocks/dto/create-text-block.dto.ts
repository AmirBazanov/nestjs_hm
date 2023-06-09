import { text_blocks } from '@prisma/client';
import { IsString } from 'class-validator';
import { IsImageFile } from '../validation/validate-image';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTextBlockDto implements Omit<text_blocks, 'text_block_id'> {
  @ApiProperty({ example: 'main-page' })
  @IsString()
  group: string;
  @ApiProperty({ example: 'Hello' })
  @IsString()
  search_title: string;
  @ApiProperty({ example: 'Some interesting text' })
  @IsString()
  text: string;
  @ApiProperty({ example: 'It so interesting' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'someImage.jpeg' })
  @IsImageFile({ message: 'invalid image type received' })
  image: string;
}
