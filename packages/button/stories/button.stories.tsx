import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button } from "../src";
import { Announcement } from "./announcement";

export default {
  title: "Komponenter/Knappar/Komponent",
  component: Button,
  argTypes: {
    text: { control: 'text', defaultValue: 'Knapptext' },
    // backgroundColor: { defaultValue: '#ff0000', control: 'color'},
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
      defaultValue: 'md',
    },
    /* variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
      defaultValue: 'primary',
    }, */
    // borderWidth: { control: { type: 'number', min: 0, max: 10 } },
  },
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = ({ text, ...args }: any) => (
  <div className="flex flex-col items-start space-y-2">
    <Button {...args}>{text}</Button>
    {/*<Button {...args} variant="solid" color="primary">
      {text}
    </Button>
    <Button {...args} variant="solid" color="secondary">
      {text}
    </Button>
    <Button {...args}
      variant="solid"
      leftIcon={<span className="material-icons mr-2">settings</span>}
    >
      {text}
    </Button>
    <Button {...args}
      variant="solid"
      color="primary"
      leftIcon={<Announcement className="mr-1" />}
    >
      {text}
    </Button>
    <Button {...args}
      variant="solid"
      rightIcon={<Announcement className="ml-1" />}
    >
      {text}
    </Button>
    <Button {...args}
      variant="solid"
      color="primary"
      rightIcon={<Announcement className="ml-1" />}
    >
      {text}
    </Button>
    <Button {...args} variant="solid" loading>
      {text}
    </Button>
    <Button {...args} variant="solid" color="primary" loading loadingText="Loading...">
      {text}
</Button>*/}
  </div>
);

Template.storyName = 'Komponent';

Template.argTypes = {
  disabled: {
    type: { name: 'string', required: false },
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
  loading: {
    type: { name: 'string', required: false },
    description: 'Sets loading spinner',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  loadingText: {
    type: { name: 'string', required: false },
    description: 'Sets loading text',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
    defaultValue: '',
  },
  variant: {
    type: { name: 'string', required: false },
    description: 'Sets variant',
    table: {
      defaultValue: { summary: 'outline' },
    },
    options: ["link", "solid", "outline", "light", "ghost"],
    control: 'select',
    defaultValue: 'outline',
  },
  type: {
    type: { name: 'string', required: false },
    description: 'Sets type',
    table: {
      defaultValue: { summary: 'button' },
    },
    options: ['reset', 'button', 'submit'],
    control: 'select',
    defaultValue: 'button',
  },
  color: {
    type: { name: 'string', required: false },
    description: 'Sets color',
    table: {
      defaultValue: { summary: 'primary' },
    },
    options: ['primary', 'secondary'],
    control: 'select',
    defaultValue: 'primary',
  },
};

/*
export const outline = ({ text, ...args }: any) =>
  <div className="flex flex-col items-start space-y-2">
    <Button {...args}>{text}</Button>
    <Button {...args} color="primary">{text}</Button>
    <Button {...args} leftIcon={<Announcement className="w-5 h-5 mr-1 text-sm" />}>
      {text}
    </Button>
    <Button {...args}
      color="primary"
      leftIcon={<Announcement className="w-5 h-5 mr-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args} rightIcon={<Announcement className="w-5 h-5 ml-1 text-sm" />}>
      {text}
    </Button>
    <Button {...args}
      color="primary"
      rightIcon={<Announcement className="w-5 h-5 ml-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args} loading>{text}</Button>
    <Button {...args} color="primary" loading loadingText="Loading...">
      {text}
    </Button>
  </div>;
  */

/*
export const ghost = ({ text, ...args }: any) => (
  <div className="flex flex-col items-start space-y-2">
    <Button {...args} variant="ghost">{text}</Button>
    <Button {...args} variant="ghost" color="primary">
      {text}
    </Button>
    <Button {...args}
      variant="ghost"
      leftIcon={<Announcement className="w-5 h-5 mr-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args}
      variant="ghost"
      color="primary"
      leftIcon={<Announcement className="w-5 h-5 mr-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args}
      variant="ghost"
      rightIcon={<Announcement className="w-5 h-5 ml-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args}
      variant="ghost"
      color="primary"
      rightIcon={<Announcement className="w-5 h-5 ml-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args} variant="ghost" loading>
      {text}
    </Button>
    <Button {...args} variant="ghost" color="primary" loading loadingText="Loading...">
      {text}
    </Button>
  </div>
);

export const light = ({ text, ...args }: any) => (
  <div className="flex flex-col items-start space-y-2">
    <Button {...args} variant="light">{text}</Button>
    <Button {...args} variant="light" color="primary">
      {text}
    </Button>
    <Button {...args}
      variant="light"
      leftIcon={<Announcement className="w-5 h-5 mr-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args}
      variant="light"
      color="primary"
      leftIcon={<Announcement className="w-5 h-5 mr-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args}
      variant="light"
      rightIcon={<Announcement className="w-5 h-5 ml-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args}
      variant="light"
      color="primary"
      rightIcon={<Announcement className="w-5 h-5 ml-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args} variant="light" loading>
      {text}
    </Button>
    <Button {...args} variant="light" color="primary" loading loadingText="Loading...">
      {text}
    </Button>
  </div>
);
*/


/*export const link = ({ text, ...args }: any) => (
  <div className="flex flex-col items-start space-y-2">
    <Button {...args} variant="link" color="primary">
      {text}
    </Button>
    <Button {...args}
      variant="link"
      color="primary"
      leftIcon={<Announcement className="w-5 h-5 mr-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args}
      variant="link"
      rightIcon={<Announcement className="w-5 h-5 ml-1 text-sm" />}
    >
      {text}
    </Button>
    <Button {...args} variant="link" color="primary" loading loadingText="Loading...">
      {text}
    </Button>
  </div>
);*/

/*
export const Inaktiverad = ({ text, ...args }: any) => (
  <div className="flex flex-col items-start space-y-2">
    <Button {...args} size="md" variant="solid" color="primary" disabled>
      Default button
    </Button>
    <Button {...args} size="md" variant="solid" disabled>
      Default button
    </Button>
  </div>
);



export const Storlekar = ({ text, ...args }: any) => (
  <div className="flex flex-col items-start space-y-2">
    <Button {...args} size="md" variant="solid" color="primary">
      Default button
    </Button>    
    <Button {...args} size="sm" variant="solid" color="primary">
      Small button
    </Button>
    <Button {...args} size="md" variant="solid" color="primary">
      Medium button
    </Button>
    <Button {...args} size="lg" variant="solid" color="primary">
      Large button
    </Button>
  </div>
);
*/
