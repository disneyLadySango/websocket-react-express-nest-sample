import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Button, TextField, Typography } from '@material-ui/core';

const StyledUserCreate = styled.div`
  width: 80%;
  padding: 30px 30px 50px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
type UserCreateProps = {
  fieldChild: ReactElement;
  buttonChild: ReactElement;
};
export const UserCreate: React.FC<UserCreateProps> = (props) => (
  <StyledUserCreate>
    <Typography variant="h4">
      ユーザー名を設定してください。
      <br />
      設定後チャットルームにジョインします。
    </Typography>
    {props.fieldChild}
    {props.buttonChild}
  </StyledUserCreate>
);

const StyledTextFieldContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const StyledTextFieldWrapper = styled(TextField)`
  width: 100%;
`;
type NameFieldProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export const NameField: React.FC<NameFieldProps> = (props) => (
  <StyledTextFieldContainer>
    <StyledTextFieldWrapper
      label={'ユーザ名'}
      variant="filled"
      value={props.value}
      onChange={props.onChange}
    />
  </StyledTextFieldContainer>
);

const StyledButtonCotnaier = styled.div`
  width: 100%;
  margin-top: 10px;
`;
type CreateButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export const CreateButton: React.FC<CreateButtonProps> = (props) => (
  <StyledButtonCotnaier>
    <Button variant="contained" color="primary" onClick={props.onClick}>
      ルームに入る
    </Button>
  </StyledButtonCotnaier>
);
