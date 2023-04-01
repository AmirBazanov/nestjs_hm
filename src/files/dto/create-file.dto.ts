import { files } from '@prisma/client';

export class CreateFileDto implements Omit<files, 'create_at' | 'file_id'> {
  essence_id: number;
  essence_table: string;
  file: string;
}
