import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FILE_NOT_GIVEN } from '../constants/file.constants';

@Injectable()
export class FilesService {
  constructor(private readonly prismaService: PrismaService) {}
  async createFile(file: {
    buffer: string | NodeJS.ArrayBufferView;
  }): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      console.log(e);
      if (!file.buffer) throw new BadRequestException(FILE_NOT_GIVEN);
      throw new InternalServerErrorException();
    }
  }

  async create(file: string, tableName: string, id: number) {
    return this.prismaService.files.create({
      data: { file: file, essence_id: id, essence_table: tableName },
    });
  }

  findAll() {
    return this.prismaService.files.findMany();
  }

  remove(id: number) {
    return this.prismaService.files.delete({ where: { file_id: id } });
  }

  getUnusedFiles() {
    const subtractHour = (date, hour) => {
      date.setHours(date.getHours() - hour);
      return date;
    };
    return this.prismaService.files.findMany({
      where: {
        create_at: { lte: subtractHour(new Date(), 1) },
        essence_id: 0,
        essence_table: '0',
      },
    });
  }

  removeMany(fileIds: number[]) {
    return this.prismaService.files.deleteMany({
      where: { file_id: { in: fileIds } },
    });
  }

  updateByFile(file: string, updateDto: UpdateFileDto) {
    return this.prismaService.files.update({
      data: updateDto,
      where: { file: file },
    });
  }
}
