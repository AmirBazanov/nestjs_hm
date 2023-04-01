import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [PrismaModule],
})
export class FilesModule {}
