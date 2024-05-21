import { Meta } from '@storybook/react';
import React from 'react';
import { Bubble } from '../src';

export default {
  title: 'AI/Komponenter/Bubble',
  component: Bubble,
  tags: ['autodocs'],
} as Meta<typeof Bubble>;

export const Template = (args: typeof Bubble) => <Bubble {...args}>Hej</Bubble>;
