import React from 'react';
import styled from 'styled-components';
import { Button, Modal, TextField, Typography } from '@material-ui/core';

import * as Types from './types';

const StyledModal = styled(Modal)``;
type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  body: React.ReactElement;
};
export const CreateModal: React.FC<CreateModalProps> = (props) => (
  <StyledModal
    open={props.isOpen}
    onClose={props.onClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {props.body}
  </StyledModal>
);

type SubmitButtonProps = {
  onSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
};
const SubmitButton: React.FC<SubmitButtonProps> = (props) => (
  <Button variant="contained" color="primary" onClick={props.onSubmit}>
    作成
  </Button>
);

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 20% auto;
  border: 2px solid #000;
  border-radius: 6px;
  padding: 16px 32px 24px;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
  background-color: #fff;
  color: #424242;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledButtonWrapper = styled.div`
  margin-top: 30px;
`;
type ModalBodyProps = {
  title: string;
  onSubmit: (event: React.FormEvent<HTMLButtonElement>) => Promise<void>;
};
export const ModalBody: React.FC<ModalBodyProps> = (props) => (
  <StyledModalBody>
    <Typography variant="h4" component="h2">
      {props.title}
    </Typography>
    <StyledForm>
      {props.children}
      <StyledButtonWrapper>
        <SubmitButton onSubmit={props.onSubmit} />
      </StyledButtonWrapper>
    </StyledForm>
  </StyledModalBody>
);

const StyledTextFieldContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const StyledTextFieldWrapper = styled(TextField)`
  width: 100%;
`;
export const CreateTextField: React.FC<Types.TextFiled> = (props) => (
  <StyledTextFieldContainer>
    <StyledTextFieldWrapper
      label={props.label}
      variant="filled"
      value={props.value}
      onChange={props.onChange}
    />
  </StyledTextFieldContainer>
);
