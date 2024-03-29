import { Button } from '@sk-web-gui/button';
import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import { Modal, ModalProps } from '../src/modal';

export default {
  title: 'Komponenter/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: { label: 'Title' },
} as Meta<typeof Modal>;

export const Template = ({ ...args }: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={openHandler}>
        Open Modal
      </button>

      <Modal {...args} show={isOpen} className="w-[43rem]" onClose={closeHandler}>
        <Modal.Content>
          <h1 className="text-h2">Headline</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Mattis nisl tempor dictum elementum. Risus nulla aliquam aliquet
            eget.
          </p>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="primary" color="vattjom">
            Button
          </Button>
          <Button variant="secondary">Button</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Template.storyName = 'Modal';
