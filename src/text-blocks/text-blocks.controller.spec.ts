import { Test, TestingModule } from '@nestjs/testing';
import { TextBlocksController } from './text-blocks.controller';
import { TextBlocksService } from './text-blocks.service';

describe('TextBlocksController', () => {
  let controller: TextBlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextBlocksController],
      providers: [TextBlocksService],
    }).compile();

    controller = module.get<TextBlocksController>(TextBlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
