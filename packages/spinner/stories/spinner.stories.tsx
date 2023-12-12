import React from 'react';
import { Spinner, SpinnerProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} as Meta<typeof Spinner>;

export const Template = (args: SpinnerProps) => <Spinner {...args} />;

Template.storyName = 'Spinner';
