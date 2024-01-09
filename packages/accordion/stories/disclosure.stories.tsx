import React from 'react';
import { Meta } from '@storybook/react';
import { Disclosure, DisclosureProps } from '../src';

export default {
  title: 'Komponenter/Accordion/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  args: {
    header: 'En vanlig fråga',
  },
} as Meta<typeof Disclosure>;

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

Template.storyName = 'Disclosure';
