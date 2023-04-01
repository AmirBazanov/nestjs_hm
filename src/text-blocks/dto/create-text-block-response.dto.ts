import { text_blocks } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class CreateTextBlockResponseDto implements text_blocks {
  @ApiProperty({ example: 'main-page' })
  group: string;
  @ApiProperty({ example: 'Hello' })
  search_title: string;
  @ApiProperty({ example: 'Some interesting text' })
  text: string;
  @ApiProperty({ example: 'It so interesting' })
  title: string;

  @ApiProperty({ example: 'someImage.jpeg' })
  image: string;
  @ApiProperty({ example: 12 })
  text_block_id: number;
}
