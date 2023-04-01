import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BindRoleDto } from './dto/bind-role.dto';
import { RolesGuard } from '../roles/guards/role.guard';
import { Roles } from '../roles/decorators/role.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaUserExceptionFilter } from '../prisma-client-exception/prisma-client-exception.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseFilters(new PrismaUserExceptionFilter())
@UsePipes(new ValidationPipe())
@UseGuards(JwtAccessGuard, RolesGuard)
@Controller('users')
export class UsersController {
  S;
  constructor(private readonly usersService: UsersService) {}
  @Roles('Admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles('Admin')
  @Post('/bindRole')
  bindRole(@Body() bindData: BindRoleDto) {
    return this.usersService.bindRoleToUser(bindData);
  }

  @Roles('Admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles('Admin', 'Owner')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Roles('Admin', 'Owner')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles('Admin', 'Owner')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
