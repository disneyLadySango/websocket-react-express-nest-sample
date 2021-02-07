import React from 'react';

import * as Presenter from './UserCreatePresenter';

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const UserCreate: React.FC<Props> = (props) => {
  return (
    <Presenter.UserCreate
      fieldChild={
        <Presenter.NameField value={props.value} onChange={props.onChange} />
      }
      buttonChild={<Presenter.CreateButton onClick={props.onClick} />}
    />
  );
};

export default UserCreate;
