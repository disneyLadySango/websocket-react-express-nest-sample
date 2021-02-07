import { User } from './user.model';
import { Chat } from './chat.model';
import { getNextId } from 'src/utils/array';
import { createUid, getNowDay } from 'src/utils/model';
import { ValidationException } from 'src/exception/validate.exception';

export class Room {
  id: number;
  uid: string;
  name: string;
  description: string;
  members: User[];
  chats: Chat[];
  createdAt: string;
  updatedAt: string;

  constructor(id: number, name: string, description: string) {
    if (!name) {
      throw new ValidationException('名前が入力されていません', [
        { field: 'name', message: '必須項目です' },
      ]);
    }
    this.id = id;
    this.uid = createUid();
    this.name = name;
    this.description = description;
    this.members = new Array<User>();
    this.chats = new Array<Chat>();
    const now = getNowDay();
    this.createdAt = now;
    this.updatedAt = now;
  }

  join(user: User) {
    this.members.push(user);
    const id = getNextId(this.chats);
    const chat = new Chat(id, null, `新たに${user.name}さんが参加しました。`);
    this.chats.push(chat);
    this._updateDate();
  }

  leave(user: User): void {
    const newMembers = this.members.filter(
      (member) => member.name !== user.name,
    );
    this.members = newMembers;
    const id = getNextId(this.chats);
    const chat = new Chat(id, null, `${user.name}さんが退出しました。`);
    this.chats.push(chat);
    this._updateDate();
  }

  send(chat: Chat): Chat[] {
    this.chats.push(chat);
    this._updateDate();
    return this.chats;
  }

  private _updateDate() {
    this.updatedAt = getNowDay();
  }
}
