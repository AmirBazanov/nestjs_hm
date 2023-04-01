import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJ1c2VySWQiOjEsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4MDMzOTU1MCwiZXhwIjoxNjgwMzQwNDUwfQ.Yohv4kuLPyEfMqT19O4y4mm6fBRDWVQHRdwjOvYqEcs',
  })
  @IsString()
  access_token: string;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJ1c2VySWQiOjEsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4MDMzOTU1MCwiZXhwIjoxNjgwMzQwNDUwfQ.Yohv4kuLPyEfMqT19O4y4mm6fBRDWVQHRdwjOvYqEcs',
  })
  @IsString()
  refresh_token: string;
}
