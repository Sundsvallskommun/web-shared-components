import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { Modal } from '../src/modal/modal';

export default {
  title: 'Komponenter/Modal/Komponent',
  component: Modal,
  tags: ['autodocs'],
} as Meta;

const TestComponent = () => {
  useEffect(() => {
    console.log('Test component mounted!');
  }, []);

  return <p>Test component 👌</p>;
};

export const Template = ({ ...args }: any) => {
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

      <Modal {...args} show={isOpen} onClose={closeHandler}>
        <TestComponent />
      </Modal>
    </div>
  );
};

Template.storyName = 'Modal';
