import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as string_decoder from 'string_decoder';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const salt = await genSalt(10);
    return this.prismaService.users.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, salt),
        role: {
          connectOrCreate: {
            create: { role: createUserDto.role },
            where: { role: createUserDto.role },
          },
        },
      },
      include: {
        role: { select: { role: true }, where: { role: createUserDto.role } },
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(email: string) {
    return this.prismaService.users.findFirst({ where: { email: email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
