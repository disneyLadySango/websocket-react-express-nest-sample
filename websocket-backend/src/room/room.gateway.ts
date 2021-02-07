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
import { Room } from 'src/domain/model/room.model';

@WebSocketGateway({ namespace: 'room', origins: '*:*' })
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('RoomGateway');

  constructor(private service: RoomSerivce) {}

  async leave(room: Room): Promise<void> {
    this.server.to(room.uid).emit('leave', room);
  }

  @SubscribeMessage('leave')
  async handleLeave(client: Socket, payload: Dto.RequestJoin): Promise<void> {
    console.log('LEVE');
    console.log(payload);
    const { uid, name } = payload;
    const room = this.service.leave(uid, client.id, name);
    this.server.to(room.uid).emit('leave', { room: room });
  }

  @SubscribeMessage('join')
  async handelJoin(client: Socket, payload: Dto.RequestJoin): Promise<void> {
    this.logger.start('handelJoin', payload);

    const { uid, name } = payload;
    try {
      // ルームへのjoin処理
      const sessionId = client.id;
      const room = this.service.join(uid, sessionId, name);
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
    } catch (error) {
      this.server.to(client.id).emit('joinError', error);
    }

    this.logger.end('handelJoin');
  }

  @SubscribeMessage('send')
  async handleSend(client: Socket, payload: Dto.RequestSend) {
    this.logger.start('handleSend', payload);
    console.log(client.rooms);

    const { uid, user, message } = payload;
    const chats = this.service.send(uid, user, message);
    const emitData: Dto.ResponseSend = {
      chats,
    };
    this.server.to(uid).emit('send', emitData);

    this.logger.start('handleSend', emitData);
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
