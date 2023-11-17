import React from 'react';
import { Icon, IconProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: 'check',
  },
  argTypes: {
    color: {
      type: { name: 'string', required: false },
      description: 'Sets color',
      table: {
        defaultValue: { summary: 'primary' },
      },
      options: [undefined, 'primary', 'gronsta', 'vattjom', 'juniskar', 'bjornstigen', 'error', 'warning', 'success'],
      control: 'select',
      defaultValue: 'primary',
    },
    rounded: {
      type: { name: 'string', required: false },
      description: 'Sets rounded',
      table: {
        defaultValue: { summary: 'false' },
      },
      options: ['true', 'false'],
      control: 'boolean',
      defaultValue: 'false',
    },
    inverted: {
      type: { name: 'string', required: false },
      description: 'Sets inverted',
      table: {
        defaultValue: { summary: 'false' },
      },
      options: ['true', 'false'],
      control: 'boolean',
      defaultValue: 'false',
    },
    variant: {
      type: { name: 'string', required: false },
      description: 'Sets color',
      table: {
        defaultValue: { summary: 'tertiary' },
      },
      options: ['tertiary', 'ghost'],
      control: 'select',
      defaultValue: 'primary',
    },
  },
} as Meta<typeof Icon>;

export const Template = (props: IconProps) => (
  <div className="flex space-x-6">
    <Icon {...props} />
  </div>
);

Template.storyName = 'Icon';
