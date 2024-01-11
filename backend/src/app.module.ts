import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService  } from '@nestjs/config'
import { AppController } from './app.controller';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validation';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from './logger/logger.module';
import authConfig from './config/authConfig';
import { utilities as nestWinstonModuleUtil, WinstonModule } from 'nest-winston';
import * as winston from 'winston'
@Module({
  imports: [
    UsersModule, 
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [ emailConfig, authConfig ],
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
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(), 
            nestWinstonModuleUtil.format.nestLike('MyApp', { prettyPrint: true })
          ),

        })
      ]
    })
  ],
  controllers: [ AppController ],
  providers: [ ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('/users')
  }
}
