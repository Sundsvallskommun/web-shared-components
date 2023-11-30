import React from 'react';
import { Spinner } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} as Meta<typeof Spinner>;

export const Template = (args) => (
  <Spinner {...args} />
);

Template.storyName = 'Spinner';