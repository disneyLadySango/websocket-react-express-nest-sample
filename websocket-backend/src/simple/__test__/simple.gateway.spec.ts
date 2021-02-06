import { Test, TestingModule } from '@nestjs/testing';
import { SimpleGateway } from '../simple.gateway';

describe('SimpleGateway', () => {
  let gateway: SimpleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimpleGateway],
    }).compile();

    gateway = module.get<SimpleGateway>(SimpleGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
