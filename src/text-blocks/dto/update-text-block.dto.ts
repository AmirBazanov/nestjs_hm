import { PartialType } from '@nestjs/mapped-types';
import { CreateTextBlockDto } from './create-text-block.dto';

export class UpdateTextBlockDto extends PartialType(CreateTextBlockDto) {}
