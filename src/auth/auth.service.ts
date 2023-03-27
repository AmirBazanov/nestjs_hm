import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { WRONG_PASS_OR_LOGIN } from '../constants/auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOne(email);
    if (!user) throw new UnauthorizedException(WRONG_PASS_OR_LOGIN);
    if (await compare(password, user.password)) {
      return { email: email, userId: user.user_id };
    }
    throw new UnauthorizedException(WRONG_PASS_OR_LOGIN);
  }
  async login(user: { email: string; userId: number }) {
    const payload = { email: user.email, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: LoginDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
