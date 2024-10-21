import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('addUser')
  public async addUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    try {
      const result = await this.userService.addUser(createUserDto);
      return result;
    } catch (error) {
      throw error; 
    }
  }

  @Get('getAllUsers')
  public async getAllUsers(){
    return this.userService.getAllUsers()
  }

  @Get(':id')
  public async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

 @Delete(':id')
 public async deleteUserById(@Param('id', ParseIntPipe) id: number){
  return this.userService.deleteUserById(id);
 }

 @Post('login')
 public async login(@Body() loginDto:LoginDto):Promise<any>{
  return this.userService.login(loginDto)
}
  
}
