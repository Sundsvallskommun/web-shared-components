import { Meta } from '@storybook/react';
import React from 'react';
import { Checkbox, CheckboxProps } from '../src/checkbox';

export default {
  title: 'Komponenter/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} as Meta<typeof Checkbox>;

export const Template = (args: CheckboxProps) => (
  <div className="space-x-8">
    <Checkbox {...args}>Checkbox</Checkbox>
  </div>
);

Template.storyName = 'Checkbox';
