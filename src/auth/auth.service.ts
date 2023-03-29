import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const validatedUser = await this.userService.validateUser(loginDto);
    const { role, ...user } = validatedUser;
    return this.getTokens(user, role);
  }

  async getTokens(user, role: string) {
    const payload = { email: user.email, userId: user.user_id, role: role };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    await this.userService.updateToken(user.user_id, refresh_token);

    return { access_token: token, refresh_token: refresh_token };
  }
}
