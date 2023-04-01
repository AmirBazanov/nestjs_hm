import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FilesService } from '../files/files.service';

@Injectable()
export class TasksService {
  constructor(private readonly fileService: FilesService) {}
  @Cron('0 0 0 * * *') //runs every day at 00:00
  async deleteFiles() {
    const fileIds: number[] = (await this.fileService.getUnusedFiles()).map(
      (file) => file.file_id,
    );
    this.fileService.removeMany(fileIds).then((value) => {
      if (fileIds.length != 0)
        console.log('Unused files deleted', value, 'File IDs:', fileIds);
    });
  }
}
