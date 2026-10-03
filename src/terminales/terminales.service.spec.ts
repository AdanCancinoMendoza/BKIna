import { Test, TestingModule } from '@nestjs/testing';
import { TerminalesService } from './terminales.service.js';

describe('TerminalesService', () => {
  let service: TerminalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerminalesService],
    }).compile();

    service = module.get<TerminalesService>(TerminalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
