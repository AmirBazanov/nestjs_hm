import { Injectable } from '@nestjs/common';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { UpdateTextBlockDto } from './dto/update-text-block.dto';

@Injectable()
export class TextBlocksService {
  create(createTextBlockDto: CreateTextBlockDto) {
    return 'This action adds a new textBlock';
  }

  findAll() {
    return `This action returns all textBlocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} textBlock`;
  }

  update(id: number, updateTextBlockDto: UpdateTextBlockDto) {
    return `This action updates a #${id} textBlock`;
  }

  remove(id: number) {
    return `This action removes a #${id} textBlock`;
  }
}
