import { useState, useRef, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

import useWebSocket from 'src/hooks/useWebSocket';
import Logger from 'src/utils/logger';

type ApiResponse = {
  message: string;
};

export const useSimpleFetchAndWebScoket = () => {
  const logger = useRef<Logger>(new Logger('useSimpleFetchAndWebScoket'));
  // 表示のState
  // 入力した文字列
  const [inputValue, setInputValue] = useState<string>('');
  // APIリクエストのレスポンス
  const [apiMessage, setApiMessage] = useState<string>('');
  // ソケット側で通知がきた回数
  const [socketCount, setSocketCount] = useState<number>(0);
  // ソケット側で通知がきたメッセージ
  const [scoketMessage, setSocketMessage] = useState<string>('');
  // コネクションID
  const [connectionId, setConnectionId] = useState<string>('');

  // WebScoketのクライアントオブジェクト
  const onConnect = () => {
    const id = socket.current?.id || '';
    setConnectionId(id);
  };
  const onConnectError = () => {
    const id = socket.current?.id || '';
    setConnectionId(id);
  };
  const onDisconnect = () => {
    setSocketCount(0);
    setSocketMessage('');
    // 切れた場合はundefinedが設定される
    const id = socket.current?.id || '';
    setConnectionId(id);
  };

  const { socket, errorCount, status } = useWebSocket(
    'ws://localhost:9000/simple',
    {
      onConnect,
      onConnectError,
      onDisconnect,
    }
  );
  // コールバック登録
  useEffect(() => {
    logger.current.debug('[useEffect]');
    // 通知を受信する
    socket.current?.on('message', (message: string) => {
      logger.current.debug(`[websocket message]`, message);
      setSocketCount((prevCount) => prevCount + 1);
      setSocketMessage(message);
      const id = socket.current?.id || '';
      setConnectionId(id);
    });
    socket.current?.on('send', (message: string) => {
      logger.current.debug(`[websocket send]`, message);
      setSocketCount((prevCount) => prevCount + 1);
      setSocketMessage(message);
      const id = socket.current?.id || '';
      setConnectionId(id);
    });
  }, []);

  // action
  // inputの入力を受け取る
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    logger.current.debug('[onChange]', event);
    setInputValue(event.target.value);
  };
  // APIリクエスト
  const onClickFetch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logger.current.debug('[onClickFetch]', event);
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `http://localhost:9000/simple`,
      {
        params: {
          message: inputValue,
        },
      }
    );
    logger.current.debug('[onClickFetch]-response', response);
    setApiMessage(response.data?.message);
    socket.current?.disconnected && socket.current?.connect();
  };
  // コネクション切断
  const onClickConnection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logger.current.debug('[onClickConnection]', event);

    if (socket.current?.connected) {
      logger.current.debug('[onClickConnection]-disconnect');
      socket.current?.disconnect();
    } else {
      logger.current.debug('[onClickConnection]-connect');
      socket.current?.connect();
    }
  };
  // WebSocketを使ってメッセージをサーバに送る
  const onClickSender = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logger.current.debug('[onClickSender]', event);
    if (socket.current?.disconnected) {
      socket.current?.connect();
    }
    socket.current?.emit('send', inputValue);
  };

  const states = {
    inputValue,
    apiMessage,
    socketCount,
    scoketMessage,
    status,
    connectionId,
    errorCount,
  };
  const actions = {
    onChange,
    onClickFetch,
    onClickConnection,
    onClickSender,
  };
  return [states, actions] as const;
};
