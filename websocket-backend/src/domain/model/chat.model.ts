import { User } from './user.model';
import { getNowDay } from 'src/utils/day';

export class Chat {
  id: string;
  user: User;
  message: string;
  createdTime: string;
  updatedTime: string;

  constructor(id: string, user: User, message: string) {
    this.id = id;
    this.user = user;
    this.message = message;
    const now = getNowDay();
    this.createdTime = now;
    this.updatedTime = now;
  }
}
