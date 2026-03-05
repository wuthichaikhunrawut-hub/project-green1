import { Test, TestingModule } from '@nestjs/testing';
import { CarbonLogsController } from './carbon-logs.controller';

describe('CarbonLogsController', () => {
  let controller: CarbonLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarbonLogsController],
    }).compile();

    controller = module.get<CarbonLogsController>(CarbonLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
