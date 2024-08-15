import { Meta } from '@storybook/react';
import { NewSessionButton, NewSessionButtonProps } from '../src/components';
import React from 'react';
export default {
  title: 'AI/Komponenter/NewSessionButton',
  component: NewSessionButton,
  tags: ['autodocs'],
} as Meta<NewSessionButtonProps>;

export const Template = (args: NewSessionButtonProps) => <NewSessionButton {...args} />;
