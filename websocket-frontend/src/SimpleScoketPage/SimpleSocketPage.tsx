import React from 'react'

import { useFetchAndWebScoket } from './hooks'
import * as Presenter from './Presenter'

const SimpleSocketPage = () => {
  const [states, actions] = useFetchAndWebScoket()
  const fetchProps = {
    value: states.inputValue,
    message: states.apiMessage,
    onChange: actions.onChange,
    onClick: actions.onClickFetch,
  }
  const webscoketProps = {
    message: states.scoketMessage,
    status: states.socketStatus as string,
    count: states.socketCount,
    id: states.connectionId,
    failCount: states.failConnectCount,
    onClick: actions.onClickConnection,
    onClickSender: actions.onClickSender
  }
  return (
    <Presenter.SimpleSocketPage 
      fetchData={fetchProps}
      websocketData={webscoketProps}
    />
  )
}
export default SimpleSocketPage
