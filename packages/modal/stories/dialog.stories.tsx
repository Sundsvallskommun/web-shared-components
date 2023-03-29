import React from 'react';
import { Button } from '@sk-web-gui/button';
import { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Dialog } from '../src/dialog';

export default {
  title: 'Komponenter/Modal/Komponent/Dialog',
  component: Dialog,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta;

const TestComponent: React.FC<{ onClose: (data: any) => void }> = ({ onClose }) => {
  useEffect(() => {
    console.log('Test component mounted!');
  }, []);

  return (
    <>
      <Dialog.Content>
        <p>
          Det här är en enkel dialog.
          <br /> Har du läst och förstått att det här är en dialog?
        </p>
      </Dialog.Content>
      <Dialog.Buttons>
        <Button onClick={() => onClose(false)}>Nej</Button>
        <Button onClick={() => onClose('maybe')}>Kanske</Button>
        <Button variant="solid" color="primary" onClick={() => onClose(true)}>
          Ja
        </Button>
      </Dialog.Buttons>
    </>
  );
};

export const Template = ({ ...args }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = (res: any) => {
    console.log(res);
    setIsOpen(false);
  };

  return (
    <div>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={openHandler}>
        Open Dialog
      </button>

      <Dialog {...args} show={isOpen} onClose={closeHandler}>
        <TestComponent onClose={closeHandler} />
      </Dialog>
    </div>
  );
};

Template.storyName = 'Dialog';

Template.argTypes = {
  show: {
    type: {
      name: 'boolean',
      required: true,
    },
    description: 'Show or hide dialog',
    defaultValue: false,
  },
  onClose: {
    type: {
      name: 'function',
      required: true,
    },
    description: 'Callback function for closing dialog',
    defaultValue: null,
  },
  label: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Label of dialog',
    defaultValue: 'Dialog label',
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
    defaultValue: true,
  },
  disableCloseOutside: {
    type: {
      name: 'boolean',
      required: false,
    },
    description: 'Disable close on click outside of modal',
    defaultValue: true,
  },
};
