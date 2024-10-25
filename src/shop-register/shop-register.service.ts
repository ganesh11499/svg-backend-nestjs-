import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateShopRegisterDto } from './dto/create-shop-register.dto';
import { UpdateShopRegisterDto } from './dto/update-shop-register.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class ShopRegisterService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  //Method to add shopdetails
  public async shopRegister(
    CreateShopRegisterDto: CreateShopRegisterDto,
  ): Promise<any> {
    const {
      shopName,
      email,
      mobile,
      address,
      city,
      state,
      pincode,
      picture,
      userId,
    } = CreateShopRegisterDto;

    // Stored procedure query to add the shop
    const query = 'CALL addshop(?,?,?,?,?,?,?,?,?)';
    const params: any[] = [
      shopName,
      email,
      mobile,
      address,
      city,
      state,
      pincode,
      picture,
      userId,
    ];

    // Execute the query to register the shop and retrieve the result
    const shopResult = await this.entityManager.query(query, params);
    console.log(shopResult, 'shopResult');

    // Retrieve the shopId from the result
    const shopId = shopResult[0]?.[0]?.id; // Adjusted for nested result format
    console.log(shopId, 'shopId');

    // If shopId exists, update the user table with the new shopId
    if (shopId) {
      const updateUserQuery = `
        UPDATE user
        SET shopId = ?
        WHERE id = ?
      `;
      const updateUserParams: any[] = [shopId, userId];

      // Execute the query to update the user with the shopId
      await this.entityManager.query(updateUserQuery, updateUserParams);
    }

    return { message: 'Shop Registered Successfully' };
  }

  //getAllShopDetails
  public async getAllShops(): Promise <any[]> {
    try {

      //sql query for fecth all shops
      const query: string = 'SELECT * from shop_register';

      //execute query
      const result = await this.entityManager.query(query);

      return result;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  } 

  //getShop by id
  public async getShopById (id : number) : Promise <any> {
    try {

      //sql query for fecth indiual shop
      const query: string = 'SELECT * FROM shop_register WHERE id = ?';
      const params: any[] = [id];

      //execute query using entity manager
      const shops : any[] = await this.entityManager.query(query, params);

      if(shops.length  == 0){
        throw new NotFoundException(`User with ID ${id} not found`);
      }else{
        return shops[0];
      }
      
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  //Delete shop by id service
  public async deleteShopById (id: number) : Promise<any> {
    try {
      //sql query for delete shop by id
      const query: string = 'DELETE 8 FROM shop_register WHERE id  = ?'
      const params: any[] = [id]

      //excute query
      const shops : any[] = await this.entityManager.query(query, params)

      if(shops?.length == 0){
        throw new NotFoundException(`User with ID ${id} not found`);
      }else{
        return shops[0]
      }
      
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

}
