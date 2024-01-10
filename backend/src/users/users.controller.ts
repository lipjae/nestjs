import { Body, Controller, DefaultValuePipe, Get, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service'; 
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { ValidationPipe } from './validation.pipe';

@Controller('users')
export class UsersController {

  constructor( private userService: UsersService) { }  

  @Get()
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit)
    return process.env.DATABASE_HOST
  }

  @Post()
  async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto
    
    await this.userService.createUser(name, email, password)
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto
    return await this.userService.verifyEmail(signupVerifyToken)
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto) {
    const { email, password} = dto

    return await this.userService.login(email, password)
  }

  // @Get('/:id')
  // async getUserInfo(userId: string): Promise<UserInfo> {

  //   return this.userService.getUserInfo(userId)
  // }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
    return this.userService.findOne(id)
  }

  @Get('t/:id')
  find(@Param('id', ValidationPipe) id: number) {
    return id
  }
  
}
