import React from 'react';
import { Button } from '@sk-web-gui/button';
import { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Dialog } from '../src/dialog';

export default {
  title: 'Komponenter/Modal/Komponent/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} as Meta;

const TestComponent: React.FC<{ onClose: (data: any) => void }> = ({ onClose }) => {
  useEffect(() => {
    console.log('Test component mounted!');
  }, []);

  return (
    <>
      <Dialog.Content>
        <h1 className="text-h4">Det här är en enkel dialog.</h1>
        <p>Har du läst och förstått att det här är en dialog?</p>
      </Dialog.Content>
      <Dialog.Buttons>
        <Button variant="secondary" onClick={() => onClose(false)}>
          Nej
        </Button>
        <Button variant="secondary" onClick={() => onClose('maybe')}>
          Kanske
        </Button>
        <Button variant="primary" color="gronsta" onClick={() => onClose(true)}>
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
