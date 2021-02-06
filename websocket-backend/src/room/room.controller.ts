import { Controller, Get, Post, Body } from '@nestjs/common';

import Logger from 'src/utils/logger';
import * as Dto from 'src/room/room.dto';
import { RoomSerivce } from 'src/room/room.service';

@Controller('/room')
export class RoomController {
  private logger: Logger = new Logger('RoomController');
  constructor(private roomService: RoomSerivce) {}

  @Get()
  async findList(): Promise<Dto.ResponseFindList> {
    this.logger.start('findList');

    const rooms = this.roomService.findList();
    const response = {
      rooms,
    };

    this.logger.end('findList', response);
    return response;
  }

  @Post()
  async create(@Body() body: Dto.RequestCreate): Promise<Dto.ResponseCreate> {
    this.logger.start('create', body);
    const { name, description } = body;
    const rooms = this.roomService.create(name, description);
    const response = {
      rooms,
    };

    this.logger.end('create', response);
    return response;
  }
}
