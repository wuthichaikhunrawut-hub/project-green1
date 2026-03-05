import { Test, TestingModule } from '@nestjs/testing';
import { CarbonLogsService } from './carbon-logs.service';

describe('CarbonLogsService', () => {
  let service: CarbonLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarbonLogsService],
    }).compile();

    service = module.get<CarbonLogsService>(CarbonLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
