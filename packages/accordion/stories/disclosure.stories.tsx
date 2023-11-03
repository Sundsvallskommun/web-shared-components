import { Meta } from '@storybook/react';
import { Disclosure, DisclosureProps } from '../src';

export default {
  title: 'Komponenter/Accordions/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  args: {
    header: 'En vanlig fråga',
  },
} as Meta;

export const Template = (args: DisclosureProps) => {
  return (
    <>
      <Disclosure {...args}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero placeat eveniet quas nulla saepe minus
          recusandae quis obcaecati necessitatibus. Quidem.
        </p>
      </Disclosure>
    </>
  );
};

Template.storyName = 'Komponent';
