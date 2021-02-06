import { Module } from '@nestjs/common';

import { SimpleController } from 'src/simple/simple.controller';
import { SimpleGateway } from 'src/simple/simple.gateway';

@Module({
  controllers: [SimpleController],
  providers: [SimpleGateway],
})
export class SimpleModule {}
