import { User } from './user.model';
import { getNowDay } from 'src/utils/model';
import { ValidationException } from 'src/exception/validate.exception';

export class Chat {
  id: string;
  user: User;
  message: string;
  createdTime: string;
  updatedTime: string;

  constructor(id: string, user: User, message: string) {
    if (!message) {
      throw new ValidationException('メッセージを入力してください', [
        { field: 'message', message: '必須項目です' },
      ]);
    }
    this.id = id;
    this.user = user;
    this.message = message;
    const now = getNowDay();
    this.createdTime = now;
    this.updatedTime = now;
  }
}
