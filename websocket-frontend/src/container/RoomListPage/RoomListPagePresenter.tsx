import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

import Header from 'src/compontns/Header';
import CreateModal from 'src/compontns/CreateModal';
import * as ModelTypes from 'src/types/model';

export const RoomListPage: React.FC = (props) => (
  <div>
    <Header title={'チャット形式でのソケットサンプル'} />
    {props.children}
  </div>
);

const StyledContents = styled.div`
  padding: 40px 10% 120px;
`;
const StyledButtonWrapper = styled.div`
  width: 100%;
`;
const StyledListContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  list-style: none;
`;
type RoomListContentProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLButtonElement>) => Promise<void>;
  textFields: {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
};
export const RoomListContent: React.FC<RoomListContentProps> = (props) => (
  <StyledContents>
    <CreateModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={'新規にルームを作成します'}
      onSubmit={props.onSubmit}
      textFields={props.textFields}
    />
    <StyledButtonWrapper>
      <Button variant="contained" color="primary" onClick={props.onOpen}>
        新規ルーム作成
      </Button>
    </StyledButtonWrapper>
    <StyledListContainer>{props.children}</StyledListContainer>
  </StyledContents>
);

const StyledCardWrapper = styled.li`
  width: 100%;
  margin: 10px;
`;
const StyledUpdatedAt = styled(Typography)`
  font-size: 14;
`;
export const RoomCard: React.FC<ModelTypes.Room> = (props) => (
  <StyledCardWrapper>
    <Card>
      <CardContent>
        <StyledUpdatedAt color="textSecondary" gutterBottom>
          {`最終更新：${props.updatedAt}  現在${props.members.length}人がチャットに参加中`}
        </StyledUpdatedAt>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography variant="body2" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">チャットに参加する</Button>
      </CardActions>
    </Card>
  </StyledCardWrapper>
);
