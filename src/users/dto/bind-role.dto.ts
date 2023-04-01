import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BindRoleDto {
  @ApiProperty({ example: 12 })
  @IsNumber()
  user_id: number;
  @ApiProperty({ example: 'Admin' })
  @IsString()
  role: string;
}
