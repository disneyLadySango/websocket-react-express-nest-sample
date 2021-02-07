import React from 'react';
import { useParams } from 'react-router-dom';

import * as ModelTypes from 'src/types/model';

import { useRoomChat } from './hooks';
import * as Presneter from './RoomPagePresenter';

type UserJoinPageProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const UserJoinPage: React.FC<UserJoinPageProps> = (props) => {
  return <Presneter.UserJoinPage {...props} />;
};

type MemberChipListProps = {
  members: ModelTypes.User[];
};
const MemberChipList: React.FC<MemberChipListProps> = (props) => {
  return (
    <>
      {props.members.map((member) => (
        <Presneter.MemberChip key={member.sessionId} name={member.name} />
      ))}
    </>
  );
};

type ChatProps = {
  chat: ModelTypes.Chat;
  myUser: ModelTypes.User;
};
const Chat: React.FC<ChatProps> = (props) => {
  const date = props.chat.updatedTime.split(' ')[1];
  if (!props.chat.user) {
    return (
      <Presneter.SystemMessage>{props.chat.message}</Presneter.SystemMessage>
    );
  }
  if (props.myUser.name === props.chat.user.name) {
    return (
      <Presneter.MyMessage
        name={props.chat.user.name}
        message={props.chat.message}
        date={date}
      />
    );
  }
  return (
    <Presneter.OtherAuthorMessage
      name={props.chat.user.name}
      message={props.chat.message}
      date={date}
    />
  );
};
type ChatListProps = {
  chats: ModelTypes.Chat[];
  myUser: ModelTypes.User;
};
const ChatList: React.FC<ChatListProps> = (props) => {
  return (
    <>
      {props.chats.map((chat) => (
        <Chat key={chat.id} chat={chat} myUser={props.myUser} />
      ))}
    </>
  );
};

type UserChatPageProps = MemberChipListProps &
  ChatListProps & {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
const UserChatPage: React.FC<UserChatPageProps> = (props) => {
  return (
    <Presneter.UserChatPage
      memberChild={<MemberChipList members={props.members} />}
      chatChild={<ChatList chats={props.chats} myUser={props.myUser} />}
      value={props.value}
      onClick={props.onClick}
      onChange={props.onChange}
    />
  );
};

const RoomPage = () => {
  const params = useParams<{ uid: string }>();
  console.log(params);
  const [states, actions] = useRoomChat(params.uid);
  const title = states.room?.name || 'ユーザー名設定';

  const children = states.myUser ? (
    <UserChatPage
      members={states.members}
      chats={states.chats}
      myUser={states.myUser}
      value={states.message}
      onChange={actions.onChangeMessage}
      onClick={actions.onSendMessage}
    />
  ) : (
    <UserJoinPage
      value={states.name}
      onChange={actions.onChangeName}
      onClick={actions.onJoin}
    />
  );
  return <Presneter.RoomPage title={title}>{children}</Presneter.RoomPage>;
};

export default RoomPage;
