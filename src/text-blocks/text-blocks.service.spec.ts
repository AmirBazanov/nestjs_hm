import { Test, TestingModule } from '@nestjs/testing';
import { TextBlocksService } from './text-blocks.service';

describe('TextBlocksService', () => {
  let service: TextBlocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextBlocksService],
    }).compile();

    service = module.get<TextBlocksService>(TextBlocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
