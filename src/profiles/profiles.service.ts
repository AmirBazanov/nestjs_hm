import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProfileDto: CreateProfileDto, userId: number) {
    return this.prisma.profiles.create({
      data: {
        ...createProfileDto,
        user: {
          connect: {
            user_id: userId,
          },
        },
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.profiles.findMany({
      include: { user: { select: { email: true, role: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.profiles.findFirst({
      where: { profile_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }

  findOneByUserId(id: number) {
    return this.prisma.profiles.findFirst({
      where: { user_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profiles.update({
      data: updateProfileDto,
      where: { profile_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }

  updateByUserId(id: number, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profiles.update({
      data: updateProfileDto,
      where: { user_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }

  remove(id: number) {
    return this.prisma.profiles.delete({
      where: { profile_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }

  removeByUserId(id: number) {
    return this.prisma.profiles.delete({
      where: { user_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }
}
