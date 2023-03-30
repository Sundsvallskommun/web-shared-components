import React from 'react';
import { Input } from '../src';
import { Check } from './check';

export default {
  title: 'Komponenter/Textfält/Komponent',
  component: Input,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = (args: any) => {
  return <Input {...args} />;
};

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
  variant: {
    type: { name: 'string', required: false },
    description: 'Sets variant',
    table: {
      defaultValue: { summary: 'outline' },
    },
    options: ['solid', 'outline'],
    control: 'select',
    defaultValue: 'outline',
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
  className: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'Extra className',
    defaultValue: '',
  },
};

Template.storyName = 'Input';

export const Disabled = () => (
  <div className="flex space-x-2">
    <Input placeholder="jon@gmail.com" disabled />
    <Input placeholder="jon@gmail.com" disabled variant="solid" />
  </div>
);
Disabled.storyName = 'Inaktiverad';

export const Invalid = () => (
  <div>
    <div className="flex space-x-2">
      <Input placeholder="jon@gmail.com" invalid />
      <Input placeholder="jon@gmail.com" invalid variant="solid" />
    </div>
    <div className="flex mt-md space-x-2">
      <Input.Group invalid>
        <Input.LeftAddon children="https://" />
        <Input placeholder="mysite" />
        <Input.RightAddon children=".com" />
      </Input.Group>
      <Input.Group invalid>
        <Input.LeftAddin children="https://" />
        <Input placeholder="mysite" />
        <Input.RightAddin children=".com" />
      </Input.Group>
    </div>
  </div>
);
Invalid.storyName = 'Invaliderad';

export const Variant = () => (
  <div className="flex space-x-2">
    <Input placeholder="jon@gmail.com" />
    <Input placeholder="jon@gmail.com" variant="solid" />
  </div>
);

export const Storlekar = () => (
  <div className="flex space-x-2">
    <Input placeholder="jon@gmail.com" size="sm" />
    <Input placeholder="jon@gmail.com" size="md" />
    <Input placeholder="jon@gmail.com" size="lg" />
  </div>
);

export const Element = () => (
  <div className="flex flex-wrap w-full space-x-2">
    <Input.Group size="md">
      <Input.LeftElement children="$" className="pointer-events-none text-neutral-300" />
      <Input placeholder="ben@gmail.com" />
      <Input.RightElement children={<Check className="text-green-500" size={14} />} />
    </Input.Group>

    <Input.Group size="sm">
      <Input.LeftElement children="$" className="pointer-events-none text-neutral-300" />
      <Input placeholder="ben@gmail.com" />
      <Input.RightElement children={<Check className="text-green-500" size={14} />} />
    </Input.Group>

    <Input.Group size="md">
      <Input.LeftElement children="$" className="pointer-events-none text-neutral-300" />
      <Input placeholder="ben@gmail.com" />
      <Input.RightElement children={<Check className="text-green-500" size={16} />} />
    </Input.Group>

    <Input.Group size="lg">
      <Input.LeftElement children="$" className="pointer-events-none text-neutral-300" />
      <Input placeholder="ben@gmail.com" />
      <Input.RightElement children={<Check className="text-green-500" size={24} />} />
    </Input.Group>

    <Input.Group size="md">
      <Input.LeftElement children="$" className="pointer-events-none text-neutral-300" />
      <Input placeholder="ben@gmail.com" />
      <Input.RightElement children={<Check className="text-green-500" size={32} />} />
    </Input.Group>
  </div>
);

export const Addon = () => (
  <div className="flex flex-wrap items-center w-full">
    <Input.Group size="sm" className="mb-2 mr-2">
      <Input.LeftAddon children="https://" />
      <Input placeholder="mysite" />
      <Input.RightAddon children=".com" />
    </Input.Group>

    <Input.Group size="md" className="mb-2 mr-2">
      <Input.LeftAddon children="https://" />
      <Input placeholder="mysite" />
      <Input.RightAddon children=".com" />
    </Input.Group>

    <Input.Group size="lg" className="mb-2 mr-2">
      <Input.LeftAddon children="https://" />
      <Input placeholder="mysite" />
      <Input.RightAddon children=".com" />
    </Input.Group>
  </div>
);

export const Addin = () => (
  <div className="flex flex-wrap items-center w-full">
    <Input.Group size="sm" className="mb-2 mr-2">
      <Input.LeftAddin children="https://" />
      <Input placeholder="mysite" />
      <Input.RightAddin children=".com" />
    </Input.Group>

    <Input.Group size="md" className="mb-2 mr-2">
      <Input.LeftAddin children="https://" />
      <Input placeholder="mysite" />
      <Input.RightAddin children=".com" />
    </Input.Group>

    <Input.Group size="lg" className="mb-2 mr-2">
      <Input.LeftAddin children="https://" />
      <Input placeholder="mysite" />
      <Input.RightAddin children=".com" />
    </Input.Group>
  </div>
);
