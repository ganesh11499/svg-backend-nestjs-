import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ShopRegisterModule } from './shop-register/shop-register.module';
import { ShopRegister } from './shop-register/entities/shop-register.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'), // database host from .env or default 'localhost'
        port: parseInt(configService.get('DB_PORT', '3306')), // database port from .env or default 3306
        username: configService.get('DB_USERNAME', 'root'), // database username from .env or default 'root'
        password: configService.get('DB_PASSWORD', 'password'), // database password from .env
        database: configService.get('DB_NAME', 'svgflutter'), // database name from .env
        synchronize: true, // synchronize schema, do not use in production
        entities: [User, ShopRegister],  // Register entities
       
      }),
    }),
    UserModule,
    ShopRegisterModule,
  ],
})
export class AppModule {}
