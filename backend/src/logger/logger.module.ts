import { Module } from '@nestjs/common';
import { CustomLogger } from './custmLogger';

@Module({
  providers: [ CustomLogger],
  exports: [ CustomLogger ]
})
export class LoggerModule {}
