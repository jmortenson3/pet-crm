import { LoggerService } from '@nestjs/common';

export class Logger implements LoggerService {
  log(message: any, context?: string) {
    console.log(message);
  }
  error(message: any, trace?: string, context?: string) {
    throw new Error('Method not implemented.');
  }
  warn(message: any, context?: string) {
    throw new Error('Method not implemented.');
  }
  debug?(message: any, context?: string) {
    throw new Error('Method not implemented.');
  }
  verbose?(message: any, context?: string) {
    throw new Error('Method not implemented.');
  }
}
