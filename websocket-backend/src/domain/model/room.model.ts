import { User } from './user.model';
import { Chat } from './chat.model';
import { getNextId } from 'src/utils/array';

export class Room {
  id: number;
  uid: string;
  name: string;
  description: string;
  members: User[];
  chats: Chat[];
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.uid = Math.random().toString(32).substring(2);
    this.name = name;
    this.description = description;
    this.members = new Array<User>();
    this.chats = new Array<Chat>();
    this.createdAt = new Date();
    this.updatedAt = new Date();
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
      (member) => member.sessionId !== user.sessionId,
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
    this.updatedAt = new Date();
  }
}
