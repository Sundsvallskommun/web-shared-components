import React from 'react';
import { useMessage } from '../src';

export default {
  title: 'Komponenter/Meddelanden/Toast',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Toast = () => {
  const message = useMessage();

  const handleMessage = (status?: any) => {
    message({
      message: 'Toast message goes here.',
      status: status,
    });
  };

  return (
    <>
      <div className="flex items-center w-full space-x-4">
        <button onClick={() => handleMessage()}>Click me</button>

        <button onClick={() => handleMessage('info')}>Info</button>

        <button onClick={() => handleMessage('success')}>Success</button>
        <button onClick={() => handleMessage('error')}>Error</button>
        <button onClick={() => handleMessage('warning')}>Warning</button>
      </div>
    </>
  );
};
