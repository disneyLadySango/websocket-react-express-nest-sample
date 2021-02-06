import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

import Logger from 'src/utils/logger';
import * as ModelTypes from 'src/types/model';

export const useRoomList = () => {
  const logger = useRef<Logger>(new Logger('useRoomList'));

  const [roomList, setRoomList] = useState<ModelTypes.Room[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    logger.current.debug('useEffect');
    const fetchRoomList = async () => {
      logger.current.debug('[fetchRoomList]');
      const result = await axios.get<{ rooms: ModelTypes.Room[] }>(
        'http://localhost:9000/room'
      );
      logger.current.info('[fetchRoomList]-result', result);
      setRoomList(result.data.rooms);
    };
    fetchRoomList();
  }, []);

  const onChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      event.preventDefault();
      logger.current.debug('[onChangeName]', event);
      setName(event.target.value);
    },
    [name]
  );

  const onChangeDescription = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      event.preventDefault();
      logger.current.debug('[onChangeDescription]', event);
      setDescription(event.target.value);
    },
    [description]
  );

  const onOpen = useCallback((): void => {
    logger.current.debug('[onOpen]');
    setIsOpen(true);
  }, []);

  const onClose = useCallback((): void => {
    logger.current.debug('[onClose]');
    setIsOpen(false);
    setName('');
    setDescription('');
  }, []);

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLButtonElement>): Promise<void> => {
      event.preventDefault();
      logger.current.debug('[onSubmit]', event);
      const requestParam = {
        name,
        description,
      };
      const result = await axios.post<{ rooms: ModelTypes.Room[] }>(
        'http://localhost:9000/room',
        {
          ...requestParam,
        }
      );
      logger.current.info('[onSubmit]-result', result);
      setRoomList(result.data.rooms);
      onClose();
    },
    [name, description, isOpen]
  );

  const states = {
    roomList,
    isOpen,
    name,
    description,
  };
  const actions = {
    onChangeName,
    onChangeDescription,
    onOpen,
    onClose,
    onSubmit,
  };

  return [states, actions] as const;
};
