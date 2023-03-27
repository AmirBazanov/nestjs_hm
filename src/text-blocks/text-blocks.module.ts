import { Module } from '@nestjs/common';
import { TextBlocksService } from './text-blocks.service';
import { TextBlocksController } from './text-blocks.controller';

@Module({
  controllers: [TextBlocksController],
  providers: [TextBlocksService]
})
export class TextBlocksModule {}
