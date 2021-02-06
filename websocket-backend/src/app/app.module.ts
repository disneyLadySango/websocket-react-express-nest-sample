import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SimpleModule } from 'src/simple/simple.module';
import { RoomModule } from 'src/room/room.module';
@Module({
  imports: [SimpleModule, RoomModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
