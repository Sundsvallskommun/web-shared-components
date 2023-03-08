import { ArgTypes } from '@storybook/react';
import { Textarea } from '../src';

export default {
  title: 'WIP/Komponenter/Textarea',
  component: Textarea,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Basic = (args: ArgTypes) => <Textarea {...args} placeholder="name@example.com" />;

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

Basic.argTypes = {
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
