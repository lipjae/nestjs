import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService  } from '@nestjs/config'
import { AppController } from './app.controller';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validation';

console.log(`${__dirname}/config/env/.${process.env.NODE_ENV}.env,`)
@Module({
  imports: [
    UsersModule, 
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [ emailConfig ],
      isGlobal: true,
      validationSchema,
    })
  ],
  controllers: [  ],
  providers: [   ],
})
export class AppModule {}
