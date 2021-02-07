import { Chat } from 'src/domain/model/chat.model';
import { Room } from 'src/domain/model/room.model';
import { User } from 'src/domain/model/user.model';

export interface ResponseFindList {
  rooms: Room[];
}

export interface RequestCreate {
  name: string;
  description: string;
}

export interface ResponseCreate {
  rooms: Room[];
}

export interface RequestJoin {
  uid: string;
  name: string;
}

export interface ResponseJoin {
  room: Room;
}

export interface ResponseOtherJoin {
  room: Room;
}

export interface RequestSend {
  uid: string;
  user: User;
  message: string;
}

export interface ResponseSend {
  chats: Chat[];
}

export interface RequestLeave {
  uid: string;
  user: User;
}
