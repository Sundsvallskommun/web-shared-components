import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { Modal } from '../src/modal/modal';

export default {
  title: 'Komponenter/Modal/Komponent',
  component: Modal,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
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

Template.argTypes = {
  show: {
    type: {
      name: 'boolean',
      required: true,
    },
    description: 'Show or hide modal',
    defaultValue: false,
  },
  onClose: {
    type: {
      name: 'function',
      required: true,
    },
    description: 'Callback function for closing Modal',
    defaultValue: null,
  },
  label: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Name of modal',
    defaultValue: 'Modal label',
  },
  className: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Extra className',
    defaultValue: '',
  },
  hideClosebutton: {
    type: {
      name: 'boolean',
      required: false,
    },
    description: 'If you should hide the close button in the corner',
    defaultValue: false,
  },
  disableCloseOutside: {
    type: {
      name: 'boolean',
      required: false,
    },
    description: 'Disable close on click outside of modal',
    defaultValue: false,
  },
};
