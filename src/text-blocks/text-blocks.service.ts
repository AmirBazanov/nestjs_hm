import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { UpdateTextBlockDto } from './dto/update-text-block.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilesService } from '../files/files.service';
import { TEXT_ALREADY_EXIST } from '../constants/text-block.constants';

@Injectable()
export class TextBlocksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FilesService,
  ) {}
  async create(createTextBlockDto: CreateTextBlockDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    let textBlock;
    try {
      textBlock = await this.prismaService.text_blocks.create({
        data: { ...createTextBlockDto, image: fileName },
      });
    } catch (e) {
      throw new ConflictException(TEXT_ALREADY_EXIST);
    }
    return textBlock;
  }

  findAll() {
    return this.prismaService.text_blocks.findMany();
  }

  findOne(title: string) {
    return this.prismaService.text_blocks.findFirstOrThrow({
      where: { search_title: title },
    });
  }

  findByGroup(group: string) {
    return this.prismaService.text_blocks.findMany({
      where: { group: group },
    });
  }

  update(title: string, updateTextBlockDto: UpdateTextBlockDto) {
    return this.prismaService.text_blocks.update({
      data: updateTextBlockDto,
      where: { search_title: title },
    });
  }

  async remove(id: number) {
    const deletedFile = await this.prismaService.text_blocks.delete({
      where: { text_block_id: id },
    });
    await this.fileService.updateByFile(deletedFile.image, {
      essence_id: 0,
      essence_table: '0',
    });
  }
}
