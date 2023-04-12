import React from 'react';
import { Input, InputProps } from '../src';
import { Check } from './check';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Textfält/Komponent',
  component: Input,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: InputProps) => {
  return <Input {...args} />;
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
