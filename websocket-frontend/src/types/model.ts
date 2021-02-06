export type User = {
  sessionId: string;
  name: string;
};

export type Chat = {
  id: string;
  user: User;
  message: string;
  createdTime: string;
  updatedTime: string;
};

export type Room = {
  id: number;
  uid: string;
  name: string;
  description: string;
  members: User[];
  chats: Chat[];
  createdAt: string;
  updatedAt: string;
};
