import React from 'react';
import { MessageProps, useMessage, Message } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Meddelanden/Toast',
  component: Message,
  tags: ['autodocs'],
  args: {
    message: 'Toast message goes here.',
  },
} as Meta;

export const Template = (args: MessageProps) => {
  const message = useMessage();

  const handleMessage = (status?: any) => {
    message({
      message: 'Toast message goes here.',
      status: status,
      ...{ ...args },
    });
  };

  return (
    <>
      <Message {...args} />
      <div className="flex items-center mt-lg w-full space-x-4">
        <button onClick={() => handleMessage()}>Default</button>

        <button onClick={() => handleMessage('info')}>Info</button>

        <button onClick={() => handleMessage('success')}>Success</button>
        <button onClick={() => handleMessage('error')}>Error</button>
        <button onClick={() => handleMessage('warning')}>Warning</button>
      </div>
    </>
  );
};

Template.storyName = 'Message';
