import Logger from 'src/utils/logger';
import { User } from 'src/domain/model/user.model';
import { Room } from 'src/domain/model/room.model';
import { Chat } from 'src/domain/model/chat.model';
import { getNextId } from 'src/utils/array';
import { ValidationException } from 'src/exception/validate.exception';

export class RoomRepository {
  private logger: Logger = new Logger('RoomRepository');

  rooms: Room[];

  constructor() {
    this.logger.start('constructor');

    this.rooms = new Array<Room>();

    this.logger.end('constructor');
  }

  findList(): Room[] {
    this.logger.start('findList');

    this.logger.end('findList', this.rooms);
    return this.rooms;
  }

  create(name: string, description: string): Room[] {
    this.logger.start('create', name, description);

    const nextId = getNextId(this.rooms);
    const room = new Room(nextId, name, description);
    if (this.rooms.some((r) => r.uid === room.uid)) {
      // UIDがかぶったら再度実行
      return this.create(name, description);
    } else {
      this.rooms.push(room);
    }
    this.logger.end('create', this.rooms);
    return this.rooms;
  }

  delete(uid: string): void {
    this.logger.start('delete', uid);

    const newRooms = this.rooms.filter((room) => room.uid !== uid);
    this.rooms = newRooms;

    this.logger.end('delete');
  }

  join(uid: string, user: User): Room {
    this.logger.start('join', uid, user);

    // ルームの探索
    const index = this.rooms.findIndex((room) => room.uid === uid);

    // ユーザの名称確認（ユーザ名は一意）
    const room = this.rooms[index];
    if (!room.members.every((member) => member.name !== user.name)) {
      // 一意ではない場合エラー
      throw new ValidationException(
        'ユーザー名が同じ人がいます、別のユーザー名を指定してください。',
        [],
      );
    }
    this.rooms[index].join(user);

    this.logger.end('join', room);

    return room;
  }

  leave(uid: string, user: User): Room {
    this.logger.start('leave', uid, user);

    const index = this.rooms.findIndex((room) => room.uid === uid);
    this.rooms[index].leave(user);
    const room = this.rooms[index];

    this.logger.end('leave', room);

    return room;
  }

  send(uid: string, user: User, message: string): Chat[] {
    this.logger.start('send', uid, user, message);

    const index = this.rooms.findIndex((room) => room.uid === uid);
    const id = getNextId(this.rooms[index].chats);
    const chat = new Chat(id, user, message);
    const chats = this.rooms[index].send(chat);

    this.logger.end('send', chats);

    return chats;
  }

  // Disconnectで実行できるようにSend時に実行させる
  userUpdate(index: number, uid: string, user: User): void {
    this.logger.start('userUpdate', uid, user);

    this.rooms[index].userUpdate(user);

    this.logger.end('userUpdate');
  }
}
