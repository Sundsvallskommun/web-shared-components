import React from 'react';
import { Divider, DividerProps } from '../src/divider';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Divider',
  component: Divider,
  tags: ['autodocs'],
} as Meta<typeof Divider>;

export const Template = (args: DividerProps) => <Divider {...args} />;

Template.storyName = 'Divider';
