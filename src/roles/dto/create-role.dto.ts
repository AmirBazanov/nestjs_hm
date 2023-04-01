import { roles } from '@prisma/client';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto implements Omit<roles, 'role_id' | 'user_id'> {
  @ApiProperty({ example: 'Admin' })
  @IsString()
  role: string;
}
