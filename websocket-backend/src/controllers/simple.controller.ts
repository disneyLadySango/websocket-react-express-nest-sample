import { Controller, Get, Query } from '@nestjs/common';
import Logger from 'src/utils/logger';
import { SimpleGateway } from 'src/gateways/simple.gateway';

@Controller('/simple')
export class SimpleController {
  private logger: Logger = new Logger('SimpleController');
  constructor(private simpleGateway: SimpleGateway) {}

  @Get()
  message(@Query('message') message: string) {
    this.logger.start('message', message);

    this.simpleGateway.sendMessage(message);

    this.logger.end('message', { message: `Hello ${message}` });
    return { message: `Hello ${message}` };
  }
}
