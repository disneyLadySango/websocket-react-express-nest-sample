import { useState, useRef, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { io, Socket } from "socket.io-client"

const REQUEST_URL = {
  api: 9000,
  webcoket: 9001,
}
const SOCKET_STATUS_MESSAGE = {
  not: 'コネクションはまだ張られていません',
  open: 'コネクションを確立します',
  pendding: 'コネクション確立した状態です',
  retry: 'コネクション接続に失敗した為リトライ中です',
  fail: 'コネクション確立に失敗しました、再度試してください。',
  close: 'コネクション切断しています'
} as const
type SocketStatus = typeof SOCKET_STATUS_MESSAGE[keyof typeof SOCKET_STATUS_MESSAGE]

type ApiResponse = {
  message: string,
}

export const useFetchAndWebScoket = () => {
  // WebScoketのクライアントオブジェクト
  const socket = useRef<Socket>()  

  // 表示のState
  // 入力した文字列
  const [inputValue, setInputValue] = useState<string>('')
  // APIリクエストのレスポンス
  const [apiMessage, setApiMessage] = useState<string>('')
  // ソケット側で通知がきた回数
  const [socketCount, setSocketCount] = useState<number>(0)
  // ソケット側で通知がきたメッセージ
  const [scoketMessage, setSocketMessage] = useState<string>('')
  // ソケットの通信状態を示すテキスト
  const [socketStatus, setSocketStatus] = useState<SocketStatus>(SOCKET_STATUS_MESSAGE.not)  
  // コネクションID
  const [connectionId, setConnectionId] = useState<string>('')
  // コネクション失敗のカウント
  const [failConnectCount, setFailConnectCount] = useState<number>(0)

  // コールバック登録
  useEffect(() => {
    console.log('Connectinng..');

    socket.current = io('ws://localhost:9000')
    socket.current.on('connect', (payload: any) => {
      console.log('WEBSOCKET_______CONNECT', payload)
      setSocketStatus(SOCKET_STATUS_MESSAGE.open)
      const id = socket.current?.id || ''
      setConnectionId(id)
    })
    // 通知を受信する
    socket.current.on('message', (message: string) => {
      console.log('WEBSOCKET_______MESSAGE')
      setSocketStatus(SOCKET_STATUS_MESSAGE.pendding)
      setSocketCount(prevCount => prevCount + 1)
      setSocketMessage(message)
      failConnectCount !== 0 && setFailConnectCount(0)
      const id = socket.current?.id || ''
      setConnectionId(id)
    })
    socket.current.on('send', (message: string) => {
      console.log('SEND________RETURN')
      setSocketStatus(SOCKET_STATUS_MESSAGE.pendding)
      setSocketCount(prevCount => prevCount + 1)
      setSocketMessage(message)
      failConnectCount !== 0 && setFailConnectCount(0)
      const id = socket.current?.id || ''
      setConnectionId(id)
    })
    // コネクション失敗の場合
    socket.current.on('connect_error', (error: Error) => {
      console.log('connect_error', error.message)
      setSocketStatus(SOCKET_STATUS_MESSAGE.fail)
      setFailConnectCount(prevCount => prevCount + 1)
      const id = socket.current?.id || ''
      setConnectionId(id)
    })
    // コネクション切断時
    socket.current.on('disconnect', (reason: any) => {
      console.log('DIS___CONNECT', reason)
      setSocketCount(0)
      setSocketMessage('')
      setSocketStatus(SOCKET_STATUS_MESSAGE.close)
      setFailConnectCount(0)
      // 切れた場合はundefinedが設定される
      const id = socket.current?.id || ''
      setConnectionId(id)
    })
    return () => {
      console.log('Disconnecting..')
      socket.current?.disconnect()
    }
  }, [])
  
  // action
  // inputの入力を受け取る
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }
  // APIリクエスト
  const onClickFetch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `http://localhost:${REQUEST_URL.api}`,
      {
        params: {
          message: inputValue,
        },
      }
    )
    setApiMessage(response.data?.message)
    socket.current?.disconnected && socket.current?.connect()
  }
  // コネクション切断
  const onClickConnection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (socket.current?.connected) {
      socket.current?.disconnect()
    } else {
      socket.current?.connect()
    }
  }
  // WebSocketを使ってメッセージをサーバに送る
  const onClickSender = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    socket.current?.emit('send', inputValue)
  }

  const states = {
    inputValue,
    apiMessage,
    socketCount,
    scoketMessage,
    socketStatus,
    connectionId,
    failConnectCount,
  }
  const actions = {
    onChange,
    onClickFetch,
    onClickConnection,
    onClickSender,
  }
  return [states, actions] as const
}