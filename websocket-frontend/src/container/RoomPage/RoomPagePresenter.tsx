import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Chip, TextField, Button } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import SendIcon from '@material-ui/icons/Send';

import Header from 'src/compontns/Header';
import UserCreate from 'src/compontns/UserCreate';

type RoomPageProps = {
  title: string;
};
export const RoomPage: React.FC<RoomPageProps> = (props) => (
  <div>
    <Header title={props.title} />
    {props.children}
  </div>
);

type UserJoinPageProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export const UserJoinPage: React.FC<UserJoinPageProps> = (props) => (
  <UserCreate {...props} />
);

const StyledUserChatPage = styled.div`
  width: 100%;
  padding: 20px 30px 50px;
  display: flex;
  flex-direction: column;
`;
const StyledContentWrap = styled.div`
  padding: 0 0 150px;
`;
const StyledMemberList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  list-style-type: none;
`;
const StyledChatList = styled.ul`
  margin-top: 20px;
  border-top: 1px solid #c5c5c5;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  overflow: scroll;
`;

type UserChatPageProps = MessageTextareaProps & {
  memberChild: ReactElement;
  chatChild: ReactElement;
};
export const UserChatPage: React.FC<UserChatPageProps> = (props) => (
  <StyledUserChatPage>
    <StyledContentWrap>
      <StyledMemberList>{props.memberChild}</StyledMemberList>
      <StyledChatList>{props.chatChild}</StyledChatList>
    </StyledContentWrap>
    <MessageTextarea
      onClick={props.onClick}
      onChange={props.onChange}
      value={props.value}
    />
  </StyledUserChatPage>
);

const StyledMemberChip = styled.li`
  margin: 5px;
`;
type MemberChipProps = {
  name: string;
};
export const MemberChip: React.FC<MemberChipProps> = (props) => (
  <StyledMemberChip>
    <Chip icon={<FaceIcon />} label={props.name} />
  </StyledMemberChip>
);

const StyledChat = styled.li`
  margin-top: 25px;
  width: 60%;
  display: flex;
  flex-direction: column;
`;
const StyledMessageMemo = styled.div`
  margin-bottom: 3px;
  display: flex;
  flex-direction: row;
`;
const StyledMessageMemoText = styled.p`
  color: #a0a0a0;
  margin: 0 5px;
`;

const StyledChatOtherAuther = styled(StyledChat)`
  margin-right: auto;
`;
const StyledMessageMemoOther = styled(StyledMessageMemo)`
  text-align: left;
`;
const StyledOtherAutherMessageContainer = styled.div`
  position: relative;
  margin-left: 80px;
  padding: 10px;
  border-radius: 10px;
  background: #eee;
  margin-right: 12%;
  float: left;
  ::before {
    position: absolute;
    content: '';
    border: 10px solid transparent;
    top: 15px;
    left: -20px;
  }
`;
const StyledMessage = styled.p`
  margin: 0 0 20px;
`;
type AuthorChatProps = {
  name: string;
  date: string;
  message: string;
};
export const OtherAuthorMessage: React.FC<AuthorChatProps> = (props) => (
  <StyledChatOtherAuther>
    <StyledMessageMemoOther>
      <StyledMessageMemoText>{props.name}</StyledMessageMemoText>
      <StyledMessageMemoText>{props.date}</StyledMessageMemoText>
    </StyledMessageMemoOther>
    <StyledOtherAutherMessageContainer>
      <StyledMessage>{props.message}</StyledMessage>
    </StyledOtherAutherMessageContainer>
  </StyledChatOtherAuther>
);

const StyledChatMyMessage = styled(StyledChat)`
  margin-left: auto;
`;
const StyledMessageMemoMy = styled(StyledMessageMemo)`
  text-align: right;
`;

const StyledMyMessageContainer = styled.div`
  position: relative;
  margin-right: 80px;
  padding: 10px;
  border-radius: 10px;
  background-color: #9cd6e7;
  margin-left: auto;
  float: right;
  ::before {
    position: absolute;
    content: '';
    border: 10px solid transparent;
    top: 15px;
    right: -20px;
  }
`;
export const MyMessage: React.FC<AuthorChatProps> = (props) => (
  <StyledChatMyMessage>
    <StyledMessageMemoMy>
      <StyledMessageMemoText>{props.date}</StyledMessageMemoText>
    </StyledMessageMemoMy>
    <StyledMyMessageContainer>
      <StyledMessage>{props.message}</StyledMessage>
    </StyledMyMessageContainer>
  </StyledChatMyMessage>
);

const StyledChatSystemMessage = styled(StyledChat)`
  margin-left: auto;
  margin-right: auto;
`;
const StyledSystemMessageContainer = styled.div`
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 20px;
  background: #eee;
`;
export const SystemMessage: React.FC = (props) => (
  <StyledChatSystemMessage>
    <StyledSystemMessageContainer>
      {props.children}
    </StyledSystemMessageContainer>
  </StyledChatSystemMessage>
);

const StyledMessageTextarea = styled.div`
  position: fixed !important;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 90%;
  background-color: #fff;
  color: #222;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
`;
const StyledSendButton = styled(Button)`
  margin-top: 10px;
`;
type MessageTextareaProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const MessageTextarea: React.FC<MessageTextareaProps> = (props) => (
  <StyledMessageTextarea>
    <TextField
      label="メッセージ"
      multiline
      rows={3}
      value={props.value}
      onChange={props.onChange}
      variant="outlined"
    />
    <StyledSendButton
      variant="contained"
      color="primary"
      endIcon={<SendIcon />}
      onClick={props.onClick}
    >
      メッセージを送信
    </StyledSendButton>
  </StyledMessageTextarea>
);
