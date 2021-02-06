import React from 'react';

import { useSimpleFetchAndWebScoket } from './hooks';
import * as Presenter from './SimpleSocketPagePresenter';

const SimpleSocketPage = () => {
  const [states, actions] = useSimpleFetchAndWebScoket();
  const fetchProps = {
    value: states.inputValue,
    message: states.apiMessage,
    onChange: actions.onChange,
    onClick: actions.onClickFetch,
  };
  const webscoketProps = {
    message: states.scoketMessage,
    status: states.status as string,
    count: states.socketCount,
    id: states.connectionId,
    failCount: states.errorCount,
    onClick: actions.onClickConnection,
    onClickSender: actions.onClickSender,
  };
  return (
    <Presenter.SimpleSocketPage
      fetchData={fetchProps}
      websocketData={webscoketProps}
    />
  );
};
export default SimpleSocketPage;
