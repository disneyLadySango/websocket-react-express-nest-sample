import { User } from './user.model';

export class Chat {
  id: string;
  user: User;
  message: string;
  createdTime: Date;
  updatedTime: Date;

  constructor(id: string, user: User, message: string) {
    this.id = id;
    this.user = user;
    this.message = message;
    this.createdTime = new Date();
    this.updatedTime = new Date();
  }
}
