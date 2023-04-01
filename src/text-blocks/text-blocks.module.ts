import { Module } from '@nestjs/common';
import { TextBlocksService } from './text-blocks.service';
import { TextBlocksController } from './text-blocks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FilesModule } from '../files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [TextBlocksController],
  providers: [TextBlocksService],
  imports: [PrismaModule, FilesModule, JwtModule, RolesModule],
})
export class TextBlocksModule {}
