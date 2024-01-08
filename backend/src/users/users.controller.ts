import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';

@Controller('users')
export class UsersController {

  constructor( private userService: UsersService) { }  

  @Get()
  index() {
    return process.env.DATABASE_HOST
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto
    await this.userService.createUser(name, email, password)
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto
    console.log(signupVerifyToken)
    return await this.userService.verifyEmail(signupVerifyToken)
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto) {
    const { email, password} = dto

    return await this.userService.login(email, password)
  }

  @Get('/:id')
  async getUserInfo(userId: string): Promise<UserInfo> {

    return this.userService.getUserInfo(userId)
  }
  
}
