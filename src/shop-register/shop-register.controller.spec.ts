import { Test, TestingModule } from '@nestjs/testing';
import { ShopRegisterController } from './shop-register.controller';
import { ShopRegisterService } from './shop-register.service';

describe('ShopRegisterController', () => {
  let controller: ShopRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopRegisterController],
      providers: [ShopRegisterService],
    }).compile();

    controller = module.get<ShopRegisterController>(ShopRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
