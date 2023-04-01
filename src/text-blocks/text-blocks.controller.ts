import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TextBlocksService } from './text-blocks.service';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { UpdateTextBlockDto } from './dto/update-text-block.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaTextBlockExceptionFilter } from '../prisma-client-exception/prisma-client-exception.filter';
import { JwtAccessGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/role.guard';
import { Roles } from '../roles/decorators/role.decorator';
import { FilesService } from '../files/files.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleResponseDto } from '../roles/dto/create-role-response.dto';

@ApiTags('Text Block')
@UsePipes(new ValidationPipe())
@UseFilters(new PrismaTextBlockExceptionFilter())
@UseGuards(JwtAccessGuard, RolesGuard)
@Controller('text-blocks')
export class TextBlocksController {
  constructor(
    private readonly textBlocksService: TextBlocksService,
    private readonly fileService: FilesService,
  ) {}

  @ApiCreatedResponse({ type: CreateRoleResponseDto })
  @Roles('Admin')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createTextBlockDto: CreateTextBlockDto,
    @UploadedFile() image,
  ) {
    const text = await this.textBlocksService.create(createTextBlockDto, image);
    await this.fileService.create(text.image, 'text-block', text.text_block_id);
    return text;
  }

  @ApiCreatedResponse({ type: CreateRoleResponseDto })
  @Roles('Admin')
  @Get()
  findAll() {
    return this.textBlocksService.findAll();
  }

  @ApiCreatedResponse({ type: CreateRoleResponseDto })
  @Get(':title')
  findOne(@Param('title') title: string) {
    return this.textBlocksService.findOne(title);
  }

  @ApiCreatedResponse({ type: CreateRoleResponseDto })
  @Get('/findByGroup/:group')
  findByGroup(@Param('group') group: string) {
    return this.textBlocksService.findByGroup(group);
  }

  @ApiCreatedResponse({ type: CreateRoleResponseDto })
  @Roles('Admin')
  @Patch(':title')
  update(
    @Param('title') title: string,
    @Body() updateTextBlockDto: UpdateTextBlockDto,
  ) {
    return this.textBlocksService.update(title, updateTextBlockDto);
  }
  @ApiCreatedResponse({ type: CreateRoleResponseDto })
  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.textBlocksService.remove(+id);
  }
}
