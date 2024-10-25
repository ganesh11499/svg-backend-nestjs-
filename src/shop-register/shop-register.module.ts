import { Module } from '@nestjs/common';
import { ShopRegisterService } from './shop-register.service';
import { ShopRegisterController } from './shop-register.controller';

@Module({
  controllers: [ShopRegisterController],
  providers: [ShopRegisterService],
})
export class ShopRegisterModule {}
