import { ConsoleLogger } from "@nestjs/common";


export class CustomLogger extends ConsoleLogger {
  
  error(message: any, stack?: string, context?: string): void {
    super.error.apply(this, arguments)
    this.some()
  };
  
  

  private some() {

  }
}