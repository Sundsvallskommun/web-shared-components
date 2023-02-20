import { Meta } from '@storybook/react';
import { useConfirm } from '../src/confirm';
import { ConfirmationDialogContextProvider } from '../src/confirm/confirm';

export default {
  title: 'Komponenter/Modal/Komponent/Confirm',
  component: ConfirmationDialogContextProvider,
} as Meta;

const ConfirmComponent: React.FC<{ title: string; message: string; confirmLabel: string; dismissLabel: string }> = (
  props
) => {
  const { showConfirmation } = useConfirm();

  const openHandler = () => {
    showConfirmation(props.title, props.message, props.confirmLabel, props.dismissLabel).then((result) => {
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

Template.argTypes = {
  title: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Confirmation title',
    defaultValue: 'Dialog label',
  },

  message: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Confirmation message',
    defaultValue: 'Is this a confirmation dialog?',
  },

  confirmLabel: {
    type: {
      name: 'string',
      required: false,
    },
    table: {
      defaultValue: { summary: 'Ja' },
    },
    default: 'Ja',
    description: 'Text on confirm button',
    defaultValue: 'Yes',
  },
  dismissLabel: {
    type: {
      name: 'string',
      required: false,
    },
    table: {
      defaultValue: { summary: 'Nej' },
    },
    description: 'Text on dismiss button',
    defaultValue: 'No',
  },
};
