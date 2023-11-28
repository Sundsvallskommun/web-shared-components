import React from 'react';
import { FormControl, FormLabel, Switch, SwitchProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Switch',
  component: Switch,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: SwitchProps) => (
  <div className="space-x-2">
    <FormControl {...args} id="firstname">
      <Switch {...args} aria-label="example switch 1" />
    </FormControl>
  </div>
);

Template.storyName = 'Switch';