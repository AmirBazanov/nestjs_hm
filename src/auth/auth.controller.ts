import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from '../profiles/profiles.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly profilesService: ProfilesService,
    private readonly usersService: UsersService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  @ApiCreatedResponse({ type: RegistrationDto })
  async register(@Body() registrationDto: RegistrationDto) {
    const { user, ...profile } = registrationDto;
    const result = await this.usersService.create(user);
    return this.profilesService.create(profile, result.user_id);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  @ApiCreatedResponse({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
