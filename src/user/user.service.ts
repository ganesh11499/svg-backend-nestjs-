import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { JwtService } from './jwt-service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  //login function
  public async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    //sql query
    const query: string = 'SELECT * FROM user WHERE email= ?';

    //passing the email as the parameter.
    const params: any[] = [email];

    const users: any[] = await this.entityManager.query(query, params);
    const user = users[0];

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.generateToken(user);
    return { ...user, token, status: 200 };
  }

  // Method to add a new user
  public async addUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { userName, email, password, shopId = 0 } = createUserDto;
      const saltRounds = 10;

      //check if email already in registered
      const existingUser = await this.entityManager.findOne(User, {
        where: { email },
      });

      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }

      // Hash the user's password
      const hashedPassword: string = await bcrypt.hash(password, saltRounds);

      // Define the stored procedure query
      const query: string = 'CALL adduser(?,?,?,?)';
      const params: any[] = [userName, email, hashedPassword, shopId];

      // Execute the query using EntityManager
      await this.entityManager.query(query, params);

      // Return success message
      return { message: 'User created Successfully' };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Email is already in use');
      } else {
        console.error('Error in addUser:', error);
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  //method to get all users
  public async getAllUsers(): Promise<any[]> {
    try {
      //sql query for fetch all users
      const query: string = 'SELECT * FROM user';

      //execute query using entity manager
      const users: any[] = await this.entityManager.query(query);

      //return users list
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  //get idividual users based on id
  public async getUserById(id: number): Promise<any> {
    try {
      //sql query for fetch user by id
      const query: string = 'SELECT * FROM user WHERE id = ?';
      const params: any[] = [id];

      //execute the query using entity manager
      const users: any[] = await this.entityManager.query(query, params);

      if (users.length === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return users[0];
    } catch (error) {
      console.error('Error in getUserById:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  //delete user by id
  public async deleteUserById(id: number): Promise<void> {
    try {
      //first check user exists
      const existingUser = await this.entityManager.query(
        'SELECT * FROM user WHERE id = ?',
        [id],
      );
      if (!existingUser.length) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      //Delete the user
      const deleteQuery = 'DELETE FROM user WHERE id = ?';
      await this.entityManager.query(deleteQuery, [id]);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  //findByEmail
  public async findByEmial(email: string): Promise<any> {
    const query = 'SELECT * FROM user WHERE email = ?';
    const users = await this.entityManager.query(query, [email]);
    return users.length ? users[0] : null;
  }
}
