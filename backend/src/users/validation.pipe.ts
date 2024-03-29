import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    
    console.log(!metatype)

    if(!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    const errors = await validate(object)

    if(errors.length > 0) {
      throw new BadRequestException('Validation fail')
    }
    return value
  }

  toValidate(metatype: Function): boolean {
    const types: Function[] = [ String, Boolean, Number ,Array, Object ]

    return !types.includes(metatype)
  }
}