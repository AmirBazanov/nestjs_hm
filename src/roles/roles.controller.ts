import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';
import { Roles } from './decorators/role.decorator';
import { PrismaRoleExceptionFilter } from '../prisma-client-exception/prisma-client-exception.filter';
import { ROLE_NOT_FOUND } from '../constants/roles.constants';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleResponseDto } from './dto/create-role-response.dto';

@ApiTags('Roles')
@UsePipes(new ValidationPipe())
@UseGuards(JwtAccessGuard, RolesGuard)
@Roles('Admin')
@Controller('roles')
@UseFilters(new PrismaRoleExceptionFilter())
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @ApiCreatedResponse({ type: CreateRoleResponseDto })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiCreatedResponse({ type: CreateRoleResponseDto })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiCreatedResponse({ type: CreateRoleResponseDto })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.rolesService.findOne(+id);
    if (result) {
      return result;
    }
    throw new NotFoundException(ROLE_NOT_FOUND);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
