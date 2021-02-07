import { Injectable } from '@nestjs/common';

import Logger from 'src/utils/logger';
import { Chat } from 'src/domain/model/chat.model';
import { Room } from 'src/domain/model/room.model';
import { User } from 'src/domain/model/user.model';
import { RoomRepository } from 'src/room/room.repository';

@Injectable()
export class RoomSerivce {
  logger: Logger = new Logger('RoomService');

  roomRepostiory: RoomRepository;

  constructor() {
    this.logger.start('constructor');

    this.roomRepostiory = new RoomRepository();

    this.logger.start('constructor');
  }

  findList(): Room[] {
    this.logger.start('findList');

    const rooms = this.roomRepostiory.findList();

    this.logger.end('findList', rooms);

    return rooms;
  }

  create(name: string, description: string): Room[] {
    this.logger.start('create', name, description);

    const rooms = this.roomRepostiory.create(name, description);

    this.logger.end('create', rooms);

    return rooms;
  }

  join(uid: string, sessionId: string, name: string): Room {
    this.logger.start('join', uid, sessionId, name);

    const user = new User(sessionId, name);
    const room = this.roomRepostiory.join(uid, user);

    this.logger.end('join', room);

    return room;
  }

  leave(uid: string, sessionId: string, name: string): Room {
    this.logger.start('leave', uid, sessionId, name);

    const user = new User(sessionId, name);
    const room = this.roomRepostiory.leave(uid, user);

    this.logger.end('leave', room);

    return room;
  }

  send(uid: string, user: User, message: string): Chat[] {
    this.logger.start('send', uid, user, message);

    const chats = this.roomRepostiory.send(uid, user, message);

    this.logger.end('send', chats);

    return chats;
  }
}
