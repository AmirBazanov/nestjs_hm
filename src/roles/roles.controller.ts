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
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';
import { Roles } from './decorators/role.decorator';
import { PrismaRoleExceptionFilter } from '../prisma-client-exception/prisma-client-exception.filter';
import { ROLE_NOT_FOUND } from '../constants/roles.constants';

@UseGuards(JwtAccessGuard, RolesGuard)
@Roles('Admin')
@Controller('roles')
@UseFilters(new PrismaRoleExceptionFilter())
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

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
