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
import { RoomSerivce } from 'src/room/room.service';
import * as Dto from 'src/room/room.dto';

@WebSocketGateway({ namespace: 'room', origins: '*:*' })
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('RoomGateway');

  constructor(private roomService: RoomSerivce) {}

  leave(message: string, delayTime: number = 3000): void {
    // 未実装
  }

  @SubscribeMessage('join')
  async handelJoin(client: Socket, payload: Dto.RequestJoin): Promise<void> {
    this.logger.start('handelJoin', payload);

    const { uid, name } = payload;

    // ルームへのjoin処理
    const sessionId = client.id;
    const room = this.roomService.join(uid, sessionId, name);
    // 他のルームメンバーへ通知
    const otherJoinEmit: Dto.ResponseOtherJoin = {
      room,
    };
    this.server.to(uid).emit('otherJoin', otherJoinEmit);
    // 接続ユーザーへレスポンス
    // 実際にルームに接続
    await client.join(uid);
    const joinEmit: Dto.ResponseJoin = {
      room,
    };
    this.server.to(client.id).emit('join', joinEmit);

    this.logger.end('handelJoin', joinEmit);
  }

  @SubscribeMessage('send')
  async handleLeave(client: Socket, payload: Dto.RequestSend) {
    this.logger.start('handleLeave', payload);

    const { uid, user, message } = payload;
    const chats = this.roomService.send(uid, user, message);
    const emitData: Dto.ResponseSend = {
      chats,
    };
    this.server.to(uid).emit('send', emitData);

    this.logger.start('handleLeave', emitData);
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
