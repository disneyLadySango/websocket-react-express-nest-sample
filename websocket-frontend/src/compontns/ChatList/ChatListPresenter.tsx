import React from 'react';
import styled from 'styled-components';

const StyledChatList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  overflow: scroll;
`;
type ChatListProps = {
  scrollRef: React.RefObject<HTMLUListElement>;
};
export const ChatList: React.FC<ChatListProps> = (props) => (
  <StyledChatList ref={props.scrollRef}>{props.children}</StyledChatList>
);

const StyledCommonChat = styled.li`
  margin-top: 25px;
  width: 60%;
  display: flex;
  flex-direction: column;
`;
const StyledCommonChatInfo = styled.div`
  margin-bottom: 3px;
  display: flex;
  flex-direction: row;
`;
const StyledCommonChatInfoText = styled.p`
  color: #a0a0a0;
  margin: 0 5px;
`;
const StyledCommonChatMessage = styled.p`
  margin: 0;
  color: #222;
`;

const StyledChatOtherMember = styled(StyledCommonChat)`
  margin-right: auto;
`;
const StyledChatInfoOtherMember = styled(StyledCommonChatInfo)`
  margin-right: auto;
`;
const StyledChatMesssageBalloonOtherMember = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #ffc77d;
  margin-right: auto;
`;
type ChatOtherMemberProps = {
  name: string;
  date: string;
  message: string;
};
export const ChatOtherMember: React.FC<ChatOtherMemberProps> = (props) => (
  <StyledChatOtherMember>
    <StyledChatInfoOtherMember>
      <StyledCommonChatInfoText>{props.name}</StyledCommonChatInfoText>
      <StyledCommonChatInfoText>{props.date}</StyledCommonChatInfoText>
    </StyledChatInfoOtherMember>
    <StyledChatMesssageBalloonOtherMember>
      <StyledCommonChatMessage>{props.message}</StyledCommonChatMessage>
    </StyledChatMesssageBalloonOtherMember>
  </StyledChatOtherMember>
);

const StyledChatMySelf = styled(StyledCommonChat)`
  margin-left: auto;
`;
const StyledChatInfoMySelf = styled(StyledCommonChatInfo)`
  margin-left: auto;
`;
const StyledChatMesssageBalloonMySelf = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #90ee02;
  margin-left: auto;
`;
type ChatMySelfProps = {
  date: string;
  message: string;
};
export const ChatMySelf: React.FC<ChatMySelfProps> = (props) => (
  <StyledChatMySelf>
    <StyledChatInfoMySelf>
      <StyledCommonChatInfoText>{props.date}</StyledCommonChatInfoText>
    </StyledChatInfoMySelf>
    <StyledChatMesssageBalloonMySelf>
      <StyledCommonChatMessage>{props.message}</StyledCommonChatMessage>
    </StyledChatMesssageBalloonMySelf>
  </StyledChatMySelf>
);

const StyledChatSystemMessage = styled(StyledCommonChat)`
  margin-left: auto;
  margin-right: auto;
`;
const StyledChatSystemMessageText = styled.div`
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 20px;
  background: #eee;
`;
export const ChatSystemMessage: React.FC = (props) => (
  <StyledChatSystemMessage>
    <StyledChatSystemMessageText>{props.children}</StyledChatSystemMessageText>
  </StyledChatSystemMessage>
);
