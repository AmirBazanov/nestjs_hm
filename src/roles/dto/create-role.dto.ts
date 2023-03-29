import { roles } from '@prisma/client';

export class CreateRoleDto implements Omit<roles, 'role_id' | 'user_id'> {
  role: string;
}
