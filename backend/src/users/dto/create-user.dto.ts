import { BadRequestException } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { IsString, MinLength, MaxLength, IsEmail, Matches, } from 'class-validator'

export class CreateUserDto {

  @Transform(({ value, obj }) => {
    if(obj.password.includes(obj.name.trim())) {
      throw new BadRequestException('비밀번호는 이름과 같은 문자열을 포함할 수 없습니다.')
    }
    return value.trim()
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string

  @IsString()
  readonly password: string
}