import { profiles, users } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class User implements Omit<users, 'user_id'> {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;
}

export class RegisterEntity
  implements Omit<profiles, 'profile_id' | 'user_id'>
{
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  second_name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  phone_number: string;
  @ApiProperty()
  bio: string;
  @ApiProperty()
  user: User;
}

export class LoginEntity implements Omit<users, 'user_id'> {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
