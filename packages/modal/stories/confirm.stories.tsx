import React from 'react';
import { Button } from '@sk-web-gui/button';
import { Meta } from '@storybook/react';
import { useConfirm } from '../src/confirm';
import { ConfirmationDialogContextProvider } from '../src/confirm';

export default {
  title: 'Komponenter/Modal/Confirm',
  component: ConfirmationDialogContextProvider,
  tags: ['autodocs'],
  args: { title: 'Dialog label', message: 'Is this a confirmation dialog?' },
  argTypes: {
    title: {
      type: { name: 'string', required: false },
      description: 'Confirmation title',
      defaultValue: 'Dialog label',
    },

    message: {
      type: { name: 'string', required: false },
      description: 'Confirmation message',
      defaultValue: 'Is this a confirmation dialog?',
    },

    confirmLabel: {
      type: { name: 'string', required: false },
      table: { defaultValue: { summary: 'Ja' } },
      default: 'Ja',
      description: 'Text on confirm button',
      defaultValue: 'Yes',
    },
    dismissLabel: {
      type: { name: 'string', required: false },
      table: { defaultValue: { summary: 'Nej' } },
      description: 'Text on dismiss button',
      defaultValue: 'No',
    },
    dialogType: {
      type: { name: 'string', required: false },
      description: 'Set type',
      table: { defaultValue: { summary: null } },
      options: ['warning', 'error', 'info', 'primary', null],
      control: 'select',
      defaultValue: null,
    },
    icon: {
      type: { name: 'string', required: false },
      description: 'Set icon',
      table: { defaultValue: { summary: null } },
      options: ['info', 'error', 'question', null],
      control: 'select',
      defaultValue: null,
    },
  },
} as Meta<typeof ConfirmationDialogContextProvider>;

const ConfirmComponent: React.FC<{
  title: string;
  message: string;
  confirmLabel: string;
  dismissLabel: string;
  dialogType: any;
  icon: any;
}> = (props) => {
  const { showConfirmation } = useConfirm();

  const openHandler = () => {
    showConfirmation(
      props.title,
      props.message,
      props.confirmLabel,
      props.dismissLabel,
      props.dialogType,
      props.icon
    ).then((result) => {
      console.log(result);
    });
  };

  return (
    <div>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={openHandler}>
        Open confirm dialog
      </button>
    </div>
  );
};
export const Template = ({ ...args }: any) => {
  return (
    <ConfirmationDialogContextProvider>
      <ConfirmComponent {...args} />
    </ConfirmationDialogContextProvider>
  );
};

Template.storyName = 'Confirm';

const ConfirmTypeComponent: React.FC<{
  title: string;
  message: string;
  confirmLabel: string;
  dismissLabel: string;
  dialogType: any;
  icon: any;
}> = (props) => {
  const { showConfirmation } = useConfirm();

  const openHandler = () => {
    showConfirmation(
      props.title,
      props.message,
      props.confirmLabel,
      props.dismissLabel,
      props.dialogType,
      props.icon
    ).then((result) => {
      if (result === true) {
        alert('Grejen händer!');
      }
    });
  };

  return (
    <div>
      <span className="block border-b border-gray-400 mb-md font-semibold text-gray-600">
        Warning type and question icon
      </span>
      <Button variant="primary" color="primary" onClick={openHandler}>
        Open me
      </Button>
    </div>
  );
};

export const ConfirmWithType = () => {
  return (
    <ConfirmationDialogContextProvider>
      <ConfirmTypeComponent
        title="Är du säker på att du vill göra den här grejen?"
        message="Det här kommer att hända när grejen går igenom och då kommer det att vara så"
        confirmLabel="Ja, gör grejen"
        dismissLabel="Avbryt"
        dialogType="warning"
        icon="question"
      />
    </ConfirmationDialogContextProvider>
  );
};
