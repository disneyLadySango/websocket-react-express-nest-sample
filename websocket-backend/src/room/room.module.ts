import { Module } from '@nestjs/common';

import { RoomController } from 'src/room/room.controller';
import { RoomSerivce } from 'src/room/room.service';
import { RoomGateway } from 'src/room/room.gateway';
@Module({
  controllers: [RoomController],
  providers: [RoomSerivce, RoomGateway],
})
export class RoomModule {}
