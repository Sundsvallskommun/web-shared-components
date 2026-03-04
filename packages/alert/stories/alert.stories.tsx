import { Meta } from '@storybook/react';
import { Alert, AlertProps } from '../src';
import { X } from 'lucide-react';

export default {
  title: 'Komponenter/Alert',
  component: Alert.Component,
  tags: ['autodocs'],
  args: {
    type: 'info',
    size: 'md',
  },
} as Meta<typeof Alert>;

export const Template = (args: AlertProps) => {
  return (
    <div className="flex flex-col gap-16">
      <p>
        Alert används för att uppmärksamma användaren på viktig information, en varning, ett fel eller en uppmaning att
        agera.
      </p>

      <Alert {...args}>
        <Alert.Icon />
        <Alert.Content>
          <Alert.Content.Title>Titel</Alert.Content.Title>
          <Alert.Content.Description>Beskrivning</Alert.Content.Description>
        </Alert.Content>
        <Alert.Button leftIcon={<X />} iconButton size="sm" />
      </Alert>
    </div>
  );
};

Template.storyName = 'Alert';
