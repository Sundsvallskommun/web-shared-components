import { InputProps, Select } from '../src';

export default {
  title: 'Komponenter/Dropdown/Komponent',
  component: Select,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = (args: any) => (
  <Select {...args} onChange={e => console.log(e)}>
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
    <option>Option 4</option>
    <option>Option 5</option>
    <option>Option 6</option>
    <option>Option 7</option>
    <option>Option 8</option>
    <option>Option 9</option>
    <option>Option 10</option>
    <option>Option 11</option>
    <option>Option 12</option>
  </Select>
);

Template.argTypes = {
  value: {
    type: { name: 'string', required: false },
    description: 'Sets value',
    table: {
      value: { summary: '' },
    },
    defaultValue: '',
  },
  placeholder: {
    type: { name: 'string', required: false },
    description: 'Sets placeholder',
    table: {
      defaultValue: { summary: '' },
    },
    defaultValue: 'Placeholder',
  },
  'aria-label': {
    type: { name: 'string', required: false },
    description: 'Sets aria-label',
    table: {
      defaultValue: { summary: '' },
    },
    defaultValue: 'Välj alternativ',
  },
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
      defaultValue: { summary: undefined },
    },
    control: 'boolean',
    defaultValue: undefined,
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

export const Disabled = () => (
  <Select disabled placeholder="Outline">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

export const Invalid = () => (
  <Select invalid placeholder="Outline">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

export const Colored = () => (
  <Select placeholder="Outline" color="orange">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

export const Size = () => (
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
