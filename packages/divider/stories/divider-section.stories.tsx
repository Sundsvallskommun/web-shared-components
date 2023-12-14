import React from 'react';
import { Divider, DividerProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Divider/Divider.Section',
  component: Divider.Section,
  tags: ['autodocs'],
  args: {
    children: 'Section',
  },
} as Meta<typeof Divider.Section>;

export const Template = (args: React.ComponentProps<DividerProps['Section']>) => (
  <Divider.Section {...args}>{args.children}</Divider.Section>
);

Template.storyName = 'Divider';
