import React from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import * as Types from './types';

const StyledMessageTextarea = styled.div`
  position: fixed;
  bottom: 0;
  left: calc(50% - 90% / 2);
  width: 90%;
  background-color: #eee;
  color: #222;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
`;
const StyledSendButtonWarpper = styled(Button)`
  margin-top: 10px;
`;
export const MessageTextarea: React.FC<Types.Props> = (props) => (
  <StyledMessageTextarea>
    <TextField
      label="メッセージ"
      multiline
      rows={2}
      value={props.value}
      onChange={props.onChange}
      variant="outlined"
    />
    <StyledSendButtonWarpper
      variant="contained"
      color="primary"
      endIcon={<SendIcon />}
      onClick={props.onClick}
    >
      メッセージを送信
    </StyledSendButtonWarpper>
  </StyledMessageTextarea>
);
