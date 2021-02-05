import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import Logger from 'src/utils/logger';

@WebSocketGateway({ namespace: 'simple', origins: '*:*' })
export class SimpleGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SimpleGateway');

  sendMessage(message: string, delayTime: number = 3000): void {
    this.logger.start('sendMessage', message);

    setTimeout(() => {
      this.server.emit('message', `1st Time メッセージ: ${message}`);
    }, delayTime * 1);
    setTimeout(() => {
      this.server.emit('message', `2nd Time メッセージ: ${message}`);
    }, delayTime * 2);
    setTimeout(() => {
      this.server.emit('message', `last Time メッセージ: ${message}`);
    }, delayTime * 3);

    this.logger.end('sendMessage', message);
  }

  @SubscribeMessage('send')
  hadleSend(client: Socket, payload: string): void {
    this.logger.start('hadleSend', payload);
    this.logger.debug('hadleSend', `Client send: message -> ${payload}`);

    this.server.to(client.id).emit('send', payload);

    this.logger.end('hadleSend', payload);
  }

  afterInit(server: Server) {
    this.logger.debug('afterInit', 'Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.debug('handleDisconnect', `Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.debug('handleConnection', `Client connected: ${client.id}`);
  }
}
