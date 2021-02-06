import { NestFactory } from '@nestjs/core';
import { SocketIoAdapter } from './app/app.adapters';
import { AppModule } from './app/app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useWebSocketAdapter(new WsAdapter(app));
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  });
  // app.use(cors(corsOptions));
  await app.listen(9000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
