export type WebSocketEvent = {
  onConnect?: (payload?: any) => void;
  onConnectError?: (error?: Error) => void;
  onDisconnect?: (reason?: any) => void;
};
