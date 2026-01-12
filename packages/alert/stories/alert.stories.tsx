import { Meta } from '@storybook/react';
import { Alert, AlertProps } from '../src';
import Button from '@sk-web-gui/button';
import { ChevronRight } from 'lucide-react';

export default {
  title: 'Komponenter/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    title: 'Titel',
    subText: 'Undertext',
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

      <Alert {...args} />
    </div>
  );
};

export const CustomButton = () => (
  <div className="flex flex-col gap-16">
    <p>Använd propertyn customButton för att ersätta standardknappen och anpassa beteendet.</p>
    <Alert
      title="Anpassad knapp"
      customButton={
        <Button
          showBackground={false}
          size="sm"
          variant="tertiary"
          onClick={() => console.log('Klick på anpassad knapp')}
        >
          Knapp
        </Button>
      }
    />
  </div>
);

export const CustomIcon = () => (
  <div className="flex flex-col gap-16">
    <p>Använd propertyn customIcon för att ersätta standardikonen.</p>
    <Alert title="Anpassad ikon" customIcon={<ChevronRight />} />
  </div>
);

Template.storyName = 'Alert';
CustomButton.storyName = 'Anpassad knapp';
CustomIcon.storyName = 'Anpassad ikon';
