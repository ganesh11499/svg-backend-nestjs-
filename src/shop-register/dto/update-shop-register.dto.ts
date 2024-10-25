import { PartialType } from '@nestjs/mapped-types';
import { CreateShopRegisterDto } from './create-shop-register.dto';

export class UpdateShopRegisterDto extends PartialType(CreateShopRegisterDto) {}
