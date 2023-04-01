import { roles } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleResponseDto implements roles {
  @ApiProperty({ example: 'Admin' })
  role: string;
  @ApiProperty({ example: 12 })
  role_id: number;
  @ApiProperty({ example: [1, 2, 3] })
  user_id: number[];
}
