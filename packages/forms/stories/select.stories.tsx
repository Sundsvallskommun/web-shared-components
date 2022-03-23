import { InputProps, Select } from "../src";

export default {
  title: "Design System/Komponenter/Dropdown/Komponent",
  component: Select,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = (args: any) => (
  <Select {...args} placeholder="Outline">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

Template.argTypes = {
  required: {
    type: { name: 'boolean', required: false },
    description: 'Sets required',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },  
  invalid: {
    type: { name: 'boolean', required: false },
    description: 'Sets invalid',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  disabled: {
    type: { name: 'boolean', required: false },
    description: 'Sets disabled',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  variant: {
    type: { name: 'string', required: false },
    description: 'Sets variant',
    table: {
      defaultValue: { summary: 'outline' },
    },
    options: ['outline', 'solid'],
    control: 'select',
    defaultValue: 'outline',
  },
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
};

Template.storyName = 'Komponent';

export const disabled = () => (
  <Select disabled placeholder="Outline">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

export const invalid = () => (
  <Select invalid placeholder="Outline">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

export const colored = () => (
  <Select placeholder="Outline" color="orange">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

export const variant = () => (
  <div className="flex space-x-2">
    <Select placeholder="Outline">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>

    <Select placeholder="Outline" variant="solid">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
  </div>
);

export const size = () => (
  <div className="flex space-x-2">
    <Select placeholder="Outline" size="sm">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>

    <Select placeholder="Outline" size="md">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>

    <Select placeholder="Outline" size="lg">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
  </div>
);
