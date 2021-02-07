import React, { useEffect } from 'react';
import * as ModelTypes from 'src/types/model';
import * as Presenter from './ChatListPresenter';

type ChatProps = {
  chat: ModelTypes.Chat;
  myUser: ModelTypes.User;
};
const Chat: React.FC<ChatProps> = (props) => {
  const date = props.chat.updatedTime.split(' ')[1];
  if (!props.chat.user) {
    return (
      <Presenter.ChatSystemMessage>
        {props.chat.message}
      </Presenter.ChatSystemMessage>
    );
  }
  if (props.myUser.name === props.chat.user.name) {
    return <Presenter.ChatMySelf message={props.chat.message} date={date} />;
  }
  return (
    <Presenter.ChatOtherMember
      name={props.chat.user.name}
      message={props.chat.message}
      date={date}
    />
  );
};

type Props = {
  chats: ModelTypes.Chat[];
  myUser: ModelTypes.User;
  scrollRef: React.RefObject<HTMLUListElement>;
};
const ChatList: React.FC<Props> = (props) => {
  useEffect(() => {
    window.scroll(0, props.scrollRef?.current?.scrollHeight || 0);
  }, [props.scrollRef, props.chats]);
  const list = props.chats.map((chat) => (
    <Chat key={chat.id} chat={chat} myUser={props.myUser} />
  ));
  return (
    <Presenter.ChatList scrollRef={props.scrollRef}>{list}</Presenter.ChatList>
  );
};

export default ChatList;
