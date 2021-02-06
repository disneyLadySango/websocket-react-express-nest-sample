import React from 'react';

import * as Presenter from './CreateModalPresenter';
import * as Types from './types';

const CreateTextField: React.FC<Types.TextFiled> = (props) => {
  return <Presenter.CreateTextField {...props} />;
};

type ModalBodyProps = {
  title: string;
  onSubmit: (event: React.FormEvent<HTMLButtonElement>) => Promise<void>;
  textFields: Types.TextFiled[];
};
const ModalBody: React.FC<ModalBodyProps> = (props) => {
  return (
    <Presenter.ModalBody title={props.title} onSubmit={props.onSubmit}>
      {props.textFields.map((textField, index) => (
        <CreateTextField key={`${textField.label}-${index}`} {...textField} />
      ))}
    </Presenter.ModalBody>
  );
};

type Props = ModalBodyProps & {
  isOpen: boolean;
  onClose: () => void;
};
const CreateModal: React.FC<Props> = (props) => {
  const bodyProps = {
    title: props.title,
    onSubmit: props.onSubmit,
    textFields: props.textFields,
  };
  return (
    <Presenter.CreateModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      body={<ModalBody {...bodyProps} />}
    />
  );
};

export default CreateModal;
