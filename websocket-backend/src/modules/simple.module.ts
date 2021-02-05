import { Module } from '@nestjs/common';

import { SimpleController } from 'src/controllers/simple.controller';
import { SimpleGateway } from 'src/gateways/simple.gateway';

@Module({
  controllers: [SimpleController],
  providers: [SimpleGateway],
})
export class SimpleModule {}
