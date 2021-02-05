import { Module } from '@nestjs/common';

import { AppController } from '../controllers/app.controller';
import { SimpleModule } from './simple.module';
import { RoomModule } from './room.module';
@Module({
  imports: [SimpleModule, RoomModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
