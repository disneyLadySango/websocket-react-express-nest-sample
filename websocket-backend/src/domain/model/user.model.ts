import { ValidationException } from 'src/exception/validate.exception';

export class User {
  sessionId: string;
  name: string;

  constructor(sessionId: string, name: string, isLeave = false) {
    if (!name && !isLeave) {
      throw new ValidationException('名前を入力してください', [
        { field: 'name', message: '必須項目です' },
      ]);
    }
    this.sessionId = sessionId;
    this.name = name;
  }
}
