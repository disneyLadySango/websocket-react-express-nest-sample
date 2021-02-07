import React from 'react';

import * as ModelTypes from 'src/types/model';

import * as Presenter from './RoomListPagePresenter';
import { useRoomList } from './hooks';

type RoomListContentProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLButtonElement>) => Promise<void>;
  textFields: {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
  roomList: ModelTypes.Room[];
};
const RoomListContent: React.FC<RoomListContentProps> = (props) => {
  return (
    <Presenter.RoomListContent
      isOpen={props.isOpen}
      onOpen={props.onOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
      textFields={props.textFields}
    >
      {props.roomList.map((room, index) => (
        <Presenter.RoomCard key={`${room.id}-${index}`} {...room} />
      ))}
    </Presenter.RoomListContent>
  );
};

const RoomList: React.FC = (props) => {
  const [states, actions] = useRoomList();
  const textFields = [
    { label: 'ルーム名', value: states.name, onChange: actions.onChangeName },
    {
      label: 'ルーム説明',
      value: states.description,
      onChange: actions.onChangeDescription,
    },
  ];
  return (
    <Presenter.RoomListPage>
      <RoomListContent
        isOpen={states.isOpen}
        onOpen={actions.onOpen}
        onClose={actions.onClose}
        onSubmit={actions.onSubmit}
        textFields={textFields}
        roomList={states.roomList}
      />
    </Presenter.RoomListPage>
  );
};

export default RoomList;
