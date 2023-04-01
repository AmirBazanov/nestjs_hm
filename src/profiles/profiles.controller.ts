import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/role.guard';
import { Roles } from '../roles/decorators/role.decorator';
import {
  PrismaProfileExceptionFilter,
  PrismaUserExceptionFilter,
} from '../prisma-client-exception/prisma-client-exception.filter';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegistrationResponseDto } from '../auth/dto/registration.response.dto';

@ApiTags('Profile')
@UseGuards(JwtAccessGuard, RolesGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Roles('Admin')
  @ApiCreatedResponse({ type: RegistrationResponseDto })
  @UseFilters(new PrismaProfileExceptionFilter())
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Roles('Admin', 'Owner')
  @ApiCreatedResponse({ type: RegistrationResponseDto })
  @UseFilters(new PrismaProfileExceptionFilter())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Roles('Admin', 'Owner')
  @UseFilters(new PrismaProfileExceptionFilter())
  @ApiCreatedResponse({ type: RegistrationResponseDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  @Roles('Admin', 'Owner')
  @UseFilters(new PrismaProfileExceptionFilter())
  @ApiCreatedResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
  @Roles('Admin', 'Owner')
  @UseFilters(new PrismaUserExceptionFilter())
  @ApiCreatedResponse({ type: RegistrationResponseDto })
  @Get('/user/:id')
  findOneByUserId(@Param('id') id: string) {
    return this.profilesService.findOneByUserId(+id);
  }
  @Roles('Admin', 'Owner')
  @UseFilters(new PrismaUserExceptionFilter())
  @ApiCreatedResponse({ type: RegistrationResponseDto })
  @Patch('/user/:id')
  updateByUserId(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateByUserId(+id, updateProfileDto);
  }
  @Roles('Admin', 'Owner')
  @UseFilters(new PrismaUserExceptionFilter())
  @Delete('/user/:id')
  removeByUserId(@Param('id') id: string) {
    return this.profilesService.removeByUserId(+id);
  }
}
