import React from 'react';
import { Meta } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from '../src';

export default {
  title: 'Komponenter/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: {
    current: 40,
  },
  argTypes: {
    color: {
      type: { name: 'string', required: false },
      description: 'Sets color',
      table: {
        defaultValue: { summary: 'primary' },
      },
      options: [undefined, 'tertiary', 'gronsta', 'vattjom', 'juniskar', 'bjornstigen'],
      control: 'select',
    },
    accent: {
      type: { name: 'string', required: false },
      description: 'Sets accent',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    size: {
      type: { name: 'string', required: false },
      description: 'Sets size',
      control: 'radio',
      options: ['sm', 'md'],
      table: {
        defaultValue: { summary: 'sm' },
      },
    },
  },
} as Meta<typeof ProgressBar>;

export const Template = (args: ProgressBarProps) => <ProgressBar {...args}></ProgressBar>;

Template.storyName = 'ProgressBar';
