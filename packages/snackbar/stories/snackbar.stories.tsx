import { Meta } from '@storybook/react';
import { Snackbar, SnackbarProps, useSnackbar } from '../src';

export default {
  title: 'Komponenter/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  args: {
    message: 'Toast message goes here.',
  },
} as Meta<typeof Snackbar>;

export const Template = (args: SnackbarProps) => {
  const message = useSnackbar();

  const handleSnackbar = (status?: SnackbarProps['status']) => {
    message({
      message: 'Toast message goes here.',
      status: status,
      messageRole: args.messageRole,
      ...{ ...args },
    });
  };

  return (
    <>
      <Snackbar {...args} />
      <div className="flex items-center mt-lg w-full space-x-4">
        <button onClick={() => handleSnackbar()}>Default</button>

        <button onClick={() => handleSnackbar('info')}>Info</button>

        <button onClick={() => handleSnackbar('success')}>Success</button>
        <button onClick={() => handleSnackbar('error')}>Error</button>
        <button onClick={() => handleSnackbar('warning')}>Warning</button>
      </div>
    </>
  );
};

Template.storyName = 'Snackbar';
