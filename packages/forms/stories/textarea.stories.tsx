import { Meta } from '@storybook/react';
import React from 'react';
import { Textarea, TextareaProps } from '../src';

export default {
  title: 'Komponenter/Textfält/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: TextareaProps) => <Textarea {...args} placeholder="name@example.com" />;

Template.storyName = 'Textarea';

export const Disabled = () => <Textarea disabled placeholder="name@example.com" />;

export const Invalid = () => <Textarea invalid placeholder="name@example.com" />;

export const Variant = () => (
  <div className="flex flex-col space-y-4">
    <Textarea placeholder="name@example.com" />
    <Textarea placeholder="name@example.com" variant="solid" />
  </div>
);

export const Colored = () => <Textarea placeholder="name@example.com" color="secondary" />;

export const Counter = () => (
  <Textarea
    placeholder="name@example.com"
    color="secondary"
    showCount={true}
    maxLength={50}
    maxLengthWarningText="Some text"
  />
);

Template.argTypes = {
  size: {
    type: { name: 'string', required: false },
    description: 'Sets size',
    table: {
      defaultValue: { summary: 'md' },
    },
    options: ['sm', 'md', 'lg'],
    control: 'select',
    defaultValue: 'md',
  },
  rows: {
    type: { name: 'string', required: false },
    description: 'Sets number of rows showm',
    table: {
      defaultValue: { summary: 'unset' },
    },
    control: 'number',
    defaultValue: 1,
  },
};
