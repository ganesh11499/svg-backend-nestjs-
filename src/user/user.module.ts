import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from './jwt-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // If you're using TypeORM or another ORM
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
