import React from 'react';

import * as Presenter from './MessageTextareaPresenter';
import * as Types from './types';

const MessageTextarea: React.FC<Types.Props> = (props) => {
  return <Presenter.MessageTextarea {...props} />;
};

export default MessageTextarea;
