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
    const index = this.members.findIndex((member) => {
      if (user.name) {
        return member.name === user.name;
      } else {
        return member.sessionId === user.sessionId;
      }
    });
    const leaveUser = this.members[index];
    const newMembers = this.members.filter(
      (member) => member.name !== leaveUser.name,
    );
    this.members = newMembers;
    const id = getNextId(this.chats);
    const chat = new Chat(id, null, `${leaveUser.name}さんが退出しました。`);
    this.chats.push(chat);
    this._updateDate();
  }

  send(chat: Chat): Chat[] {
    this.chats.push(chat);
    this._updateDate();
    return this.chats;
  }

  userUpdate(user: User): void {
    const index = this.members.findIndex((member) => member.name === user.name);
    this.members[index].sessionId = user.sessionId;
  }

  private _updateDate() {
    this.updatedAt = getNowDay();
  }
}
