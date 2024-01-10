import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService  } from '@nestjs/config'
import { AppController } from './app.controller';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validation';
import { TypeOrmModule } from '@nestjs/typeorm';

console.log(`${__dirname}/config/env/.${process.env.NODE_ENV}.env,`)
@Module({
  imports: [
    UsersModule, 
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [ emailConfig ],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
  ],
  controllers: [ AppController ],
  providers: [   ],
})
export class AppModule {}
