import { Controller, Get, Post, Body, Put } from '@nestjs/common';

import Logger from 'src/utils/logger';
import * as Dto from 'src/room/room.dto';
import { RoomSerivce } from 'src/room/room.service';
import { RoomGateway } from 'src/room/room.gateway';

@Controller('/room')
export class RoomController {
  private logger: Logger = new Logger('RoomController');
  constructor(private service: RoomSerivce, private geteway: RoomGateway) {}

  @Get()
  async findList(): Promise<Dto.ResponseFindList> {
    this.logger.start('findList');

    const rooms = this.service.findList();
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
    const rooms = this.service.create(name, description);
    const response = {
      rooms,
    };

    this.logger.end('create', response);
    return response;
  }

  @Put()
  async leave(@Body() body: Dto.RequestLeave): Promise<boolean> {
    this.logger.start('leave', body);
    console.log('TEST?____LEACE');
    console.log(body);
    const { uid, user } = body;
    const room = this.service.leave(uid, user.sessionId, user.name);
    this.geteway
      .leave(room)
      .then(() => this.logger.debug('levave', '退出の処理が完了しています'));
    this.logger.end('leave');
    return true;
  }
}
