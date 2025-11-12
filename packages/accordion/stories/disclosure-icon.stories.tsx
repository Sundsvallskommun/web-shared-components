import { Meta } from '@storybook/react';
import { Bus } from 'lucide-react';
import { Disclosure, DisclosureProps } from '../src';

export default {
  title: 'Komponenter/Accordion/Disclosure/Icon',
  component: Disclosure.Icon,
  tags: ['autodocs'],
  args: {
    icon: <Bus />,
  },
} as Meta<typeof Disclosure.Icon>;

export const Template = (args: React.ComponentPropsWithRef<DisclosureProps['Icon']>) => {
  return (
    <div className="flex flex-col gap-32">
      <p>Disclosure.Icon är en ikon-komponent tänkt att användas i headern.</p>
      <p>
        Den fungerar på samma sätt som <code>{`<Icon />`}</code>
      </p>

      <Disclosure.Icon {...args}></Disclosure.Icon>
    </div>
  );
};

Template.storyName = 'Disclosure Icon';
