import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  essence_id?: number;
  essence_table?: string;
  file?: string;
}
