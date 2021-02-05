import { Controller, Get, Query } from '@nestjs/common';
import { User } from 'src/domain/model/user.model';
@Controller('/')
export class AppController {
  constructor() {}
  @Get()
  message(@Query('message') message: string) {
    return { message: `Hello ${message}` };
  }
}
