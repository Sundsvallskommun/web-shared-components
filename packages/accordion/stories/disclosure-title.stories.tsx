import { Meta } from '@storybook/react';
import { Disclosure, DisclosureProps } from '../src';

export default {
  title: 'Komponenter/Accordion/Disclosure/Title',
  component: Disclosure.Title,
  tags: ['autodocs'],
} as Meta<typeof Disclosure.Title>;

export const Template = (args: React.ComponentPropsWithRef<DisclosureProps['Title']>) => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        Disclosure.Title används i headern för att håll din rubrik.
        <br />
        Du kan själv välja att lägga t.ex. h-taggar eller label inuti titeln. Dessa kommer att ärva rätt styling.
      </p>
      <p>Med Disclosure.Title får du dessutom rätt tillgänglighetslabel på Disclosure.Button</p>
      <p>Med alt-versionen så läggs en horisontell divider efter texten.</p>
      <Disclosure.Title {...args}>
        <h3>En rubrik till Disclosure</h3>
      </Disclosure.Title>
    </div>
  );
};

Template.storyName = 'Disclosure Title';
