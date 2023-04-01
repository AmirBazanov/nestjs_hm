import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FilesModule } from '../files/files.module';

@Module({
  providers: [TasksService],
  imports: [FilesModule],
})
export class TasksModule {}
