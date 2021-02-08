import React from 'react';
import { useParams } from 'react-router-dom';

import * as ModelTypes from 'src/types/model';
import ChatList from 'src/compontns/ChatList';

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
  myUser: ModelTypes.User;
};
const MemberChipList: React.FC<MemberChipListProps> = (props) => {
  return (
    <>
      {props.members.map((member) => {
        if (member.name === props.myUser.name) {
          return (
            <Presneter.MySelfChip key={member.sessionId} name={member.name} />
          );
        }
        return (
          <Presneter.MemberChip key={member.sessionId} name={member.name} />
        );
      })}
    </>
  );
};

type UserChatPageProps = MemberChipListProps & {
  chats: ModelTypes.Chat[];
  myUser: ModelTypes.User;
  scrollRef: React.RefObject<HTMLUListElement>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onExit: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const UserChatPage: React.FC<UserChatPageProps> = (props) => {
  return (
    <Presneter.UserChatPage
      memberChild={
        <MemberChipList myUser={props.myUser} members={props.members} />
      }
      chatChild={
        <ChatList
          chats={props.chats}
          myUser={props.myUser}
          scrollRef={props.scrollRef}
        />
      }
      value={props.value}
      onClick={props.onClick}
      onChange={props.onChange}
      onExit={props.onExit}
    />
  );
};

const RoomPage = () => {
  const params = useParams<{ uid: string }>();
  const [states, actions] = useRoomChat(params.uid);
  const title = states.room?.name || 'ユーザー名設定';

  const children = states.myUser ? (
    <UserChatPage
      members={states.members}
      chats={states.chats}
      myUser={states.myUser}
      value={states.message}
      scrollRef={states.scrollRef}
      onChange={actions.onChangeMessage}
      onClick={actions.onSendMessage}
      onExit={actions.onLeave}
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
