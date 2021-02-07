import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

import Logger from 'src/utils/logger';
import useWebSocket from 'src/hooks/useWebSocket';
import * as ModelTypes from 'src/types/model';

export const useRoomChat = (uid: string) => {
  const logger = useRef<Logger>(new Logger('useSimpleFetchAndWebScoket'));

  const scrollRef = useRef<HTMLUListElement>(null);

  // 登録時のデータ
  const [name, setName] = useState<string>('');

  // メッセージ
  const [message, setMessage] = useState<string>('');

  // チャット一覧
  const [chats, setChats] = useState<ModelTypes.Chat[]>([]);
  // 参加者一覧
  const [members, setMembers] = useState<ModelTypes.User[]>([]);
  //　自身
  const [myUser, setMyUser] = useState<ModelTypes.User | null>(null);
  // ルームタイトル
  const [room, setRoom] = useState<ModelTypes.Room | null>(null);

  // ソケット
  const { socket } = useWebSocket('ws://localhost:9000/room', undefined, false);

  useEffect(() => {
    // イベントハンドラを登録
    // ジョインエラー
    socket.current?.on('joinError', (error: any) => {
      // TODO:何かする（予定、エラーにする場合ってどうするんだ、レスポンス的なのでemitするのか）
      logger.current.error('JOIN_ERROR');
      logger.current.error(error);
    });
    // 自分がジョインした場合
    socket.current?.on('join', (payload: { room: ModelTypes.Room }) => {
      setRoom(payload.room);
      setChats(payload.room.chats);
      setMembers(payload.room.members);
      setMyUser(payload.room.members[payload.room.members.length - 1]);
      socket.current?.off('joinError');
    });
    // 他の人がジョインした場合のデータ受信
    socket.current?.on('otherJoin', (payload: { room: ModelTypes.Room }) => {
      setChats(payload.room.chats);
      setMembers(payload.room.members);
    });
    // 他の人が退出した場合のデータ受信
    socket.current?.on('leave', (payload: { room: ModelTypes.Room }) => {
      setChats(payload.room.chats);
      setMembers(payload.room.members);
    });
    // メッセージを受信
    socket.current?.on('send', (payload: { chats: ModelTypes.Chat[] }) => {
      setChats(payload.chats);
    });
    return () => {
      // ここの退出処理だけまだ動かせていない
      socket.current?.emit('leave', { uid });
      socket.current?.disconnect();
    };
  }, []);

  // 名前の設定
  const onChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [name]
  );

  // ジョイン
  const onJoin = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      // ルームへジョイン
      socket.current?.emit('join', { uid, name });
    },
    [socket, name]
  );

  // メッセージ入力
  const onChangeMessage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    [message]
  );

  // メッセージ送信
  const onSendMessage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      socket.current?.emit('send', { uid, message, user: myUser });
      setMessage('');
    },
    [message, myUser]
  );

  // 退出
  const onLeave = useCallback(
    async (event?: React.MouseEvent<HTMLButtonElement>) => {
      const body = {
        uid,
        user: myUser,
      };
      await axios.put<boolean>('http://localhost:9000/room', {
        ...body,
      });
      setName('');
      setMessage('');
      setChats([]);
      setMembers([]);
      setMyUser(null);
    },
    []
  );

  const states = { name, message, chats, members, myUser, room, scrollRef };
  const actions = {
    onChangeName,
    onJoin,
    onChangeMessage,
    onSendMessage,
    onLeave,
  };
  return [states, actions] as const;
};
