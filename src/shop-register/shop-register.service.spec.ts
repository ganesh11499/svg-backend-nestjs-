import { Test, TestingModule } from '@nestjs/testing';
import { ShopRegisterService } from './shop-register.service';

describe('ShopRegisterService', () => {
  let service: ShopRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopRegisterService],
    }).compile();

    service = module.get<ShopRegisterService>(ShopRegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
