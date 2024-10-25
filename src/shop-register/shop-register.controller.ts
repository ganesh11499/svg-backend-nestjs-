import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopRegisterService } from './shop-register.service';
import { CreateShopRegisterDto } from './dto/create-shop-register.dto';
import { UpdateShopRegisterDto } from './dto/update-shop-register.dto';

@Controller('shop-register')
export class ShopRegisterController {
  constructor(private readonly shopRegisterService: ShopRegisterService) {}

  //addshop controller post method
  @Post('shopRegister')
  public async shopRegister(@Body() CreateShopRegisterDto: CreateShopRegisterDto): Promise<{message : String}> {
    try {
      const result = await this.shopRegisterService.shopRegister(CreateShopRegisterDto);
      return result;
    } catch (error) {
      throw error
    }
  }

  //get all shops data method
  @Get('getAllShops')
  public async getAllShops() {
    return this.shopRegisterService.getAllShops();
  }

  //Get shop by id method
  @Get(':id')
  public async getShopById(@Param('id') id: number){
    return this.shopRegisterService.getShopById(id);
  }

  //Delete shop by id method
  @Delete(':id')
  public async deleteShopById(@Param('id') id: number){
    return this.shopRegisterService.deleteShopById(id);
  }

}
