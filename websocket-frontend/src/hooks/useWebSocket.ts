import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import Logger from '../utils/logger';

const SOCKET_STATUS = {
  noConnect: 'no_connect',
  connect: 'connect',
  connectError: 'connect_error',
  disconnect: 'disconnect',
} as const;
type SocketStatus = typeof SOCKET_STATUS[keyof typeof SOCKET_STATUS];

export type WebSocketEvent = {
  onConnect?: (payload?: any) => void;
  onConnectError?: (error?: Error) => void;
  onDisconnect?: (reason?: any) => void;
};

const DEFAULT_RECONNECT_COUNT = 3;
const DEFAULT_RECONNECT_INTERVAL = 3000;

const useWebSocket = (
  connectUrl: string,
  socketEvent?: WebSocketEvent,
  reConnectCount: number = DEFAULT_RECONNECT_COUNT,
  reConnectInterval: number = DEFAULT_RECONNECT_INTERVAL
) => {
  // WebSocketのクライアントオブジェクト
  const socket = useRef<Socket>();
  const logger = useRef<Logger>(new Logger('useWebSocket'));

  const [errorCount, setErrorCount] = useState<number>(0);
  const [status, setStatus] = useState<SocketStatus>(SOCKET_STATUS.noConnect);

  useEffect(() => {
    logger.current.debug('useEffect');
    socket.current = io(connectUrl);
    // イベントハンドラ
    socket.current.on(SOCKET_STATUS.connect, (payload: any) => {
      logger.current.debug(`[${SOCKET_STATUS.connect}]`, payload);
      setErrorCount(0);
      setStatus(SOCKET_STATUS.connect);
      socketEvent?.onConnect && socketEvent.onConnect(payload);
    });
    socket.current.on(SOCKET_STATUS.connectError, (error: Error) => {
      logger.current.error(`[${SOCKET_STATUS.connectError}]`, error);
      setStatus(SOCKET_STATUS.connectError);
      socketEvent?.onConnectError && socketEvent.onConnectError(error);
      setErrorCount((prevCount) => {
        if (prevCount > reConnectCount) {
          // 接続が一定回数を超えた場合 -> 一度切断後再接続
          socket.current?.disconnect();
          setTimeout(() => socket.current?.connect(), reConnectInterval);
          return 0;
        }
        return prevCount + 1;
      });
    });
    socket.current.on(SOCKET_STATUS.disconnect, (reason: any) => {
      logger.current.debug(`[${SOCKET_STATUS.disconnect}]`, reason);
      setErrorCount(0);
      setStatus(SOCKET_STATUS.disconnect);
      socketEvent?.onDisconnect && socketEvent.onDisconnect(reason);
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return { socket, status, errorCount } as const;
};

export default useWebSocket;
