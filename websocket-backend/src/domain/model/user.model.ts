export class User {
  sessionId: string;
  name: string;

  constructor(sessionId: string, name: string) {
    this.sessionId = sessionId;
    this.name = name;
  }
}
