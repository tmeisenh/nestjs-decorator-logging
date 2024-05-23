import { Injectable, Logger } from '@nestjs/common';
import { RequestAwareLogger } from './RequestAwareLogger';
import { RequestAwareMethodDecorator } from './RequestAwareMethodDecorator';

@Injectable()
export class AppService {
  private theCustomLogger = new Logger(AppService.name);
  constructor(private readonly requestAwareLogger: RequestAwareLogger) {}

  @RequestAwareMethodDecorator()
  getHello(str: string): string {
    this.theCustomLogger.debug('getHello! - stock');
    this.requestAwareLogger.debug(AppService.name, 'getHello - request aware');
    return `Hello ${str}`;
  }
}
