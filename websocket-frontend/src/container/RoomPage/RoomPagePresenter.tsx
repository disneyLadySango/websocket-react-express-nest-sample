import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Chip, Button } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import ExitAppIcon from '@material-ui/icons/ExitToApp';

import Header from 'src/compontns/Header';
import UserCreate from 'src/compontns/UserCreate';
import MessageTextarea from 'src/compontns/MessageTextarea';

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
  padding: 20px 30px 50px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
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
const StyledChatListWrapper = styled.div`
  margin-top: 20px;
  border-top: 1px solid #c5c5c5;
`;

type UserChatPageProps = {
  memberChild: ReactElement;
  chatChild: ReactElement;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onExit: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export const UserChatPage: React.FC<UserChatPageProps> = (props) => (
  <StyledUserChatPage>
    <StyledContentWrap>
      <Link to={'/room/list'}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ExitAppIcon />}
          onClick={props.onExit}
        >
          退出（動かない）
        </Button>
      </Link>
      <StyledMemberList>{props.memberChild}</StyledMemberList>
      <StyledChatListWrapper>{props.chatChild}</StyledChatListWrapper>
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
