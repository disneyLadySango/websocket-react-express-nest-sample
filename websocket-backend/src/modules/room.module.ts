import { Module } from '@nestjs/common';

import { RoomController } from 'src/controllers/room.controller';
import { RoomSerivce } from 'src/domain/service/room.service';
import { RoomGateway } from 'src/gateways/room.gateway';
@Module({
  controllers: [RoomController],
  providers: [RoomSerivce, RoomGateway],
})
export class RoomModule {}
