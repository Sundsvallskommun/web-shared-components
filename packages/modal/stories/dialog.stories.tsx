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
