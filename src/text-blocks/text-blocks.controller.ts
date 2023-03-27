import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TextBlocksService } from './text-blocks.service';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { UpdateTextBlockDto } from './dto/update-text-block.dto';

@Controller('text-blocks')
export class TextBlocksController {
  constructor(private readonly textBlocksService: TextBlocksService) {}

  @Post()
  create(@Body() createTextBlockDto: CreateTextBlockDto) {
    return this.textBlocksService.create(createTextBlockDto);
  }

  @Get()
  findAll() {
    return this.textBlocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textBlocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextBlockDto: UpdateTextBlockDto) {
    return this.textBlocksService.update(+id, updateTextBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textBlocksService.remove(+id);
  }
}
