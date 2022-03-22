import { FormControl, FormLabel } from "@sk-web-gui/forms";
import { Switch } from "../src";

export default {
  title: "Design System/Komponenter/Toggel/Komponent",
  component: Switch,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = (args) => (
  <div className="space-x-2">
    <Switch {...args} aria-label="example switch 1" />

    <h6 className="mt-12">Form Control</h6>
    <FormControl className="flex items-center">
      <FormLabel htmlFor="are-you-sure" className="mb-0 mr-2">
        Är du verkligen säker?
      </FormLabel>
      <Switch {...args} aria-label="example switch 2" id="are-you-sure" />
    </FormControl>
  </div>
);

Template.storyName = 'Komponent';

Template.argTypes = {
  defaultChecked: {
    type: { name: 'string', required: false },
    description: 'Sets defaultChecked',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
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
export const disabled = () => (
  <div className="space-x-2">
    <Switch aria-label="example switch" disabled />
    <Switch aria-label="example switch 2" defaultChecked disabled />
  </div>
);

export const colored = () => (
  <div className="space-x-2">
    <Switch aria-label="example switch" color="secondary" />
    <Switch aria-label="example switch 2" color="secondary" defaultChecked />
  </div>
);

export const Storlekar = () => (
  <div className="space-x-2">
    <Switch aria-label="example switch" size="sm" />
    <Switch aria-label="example switch 2" size="md" />
    <Switch aria-label="example switch 3" size="lg" />
  </div>
);


export const formControl = () => (
  <FormControl className="flex items-center">
    <FormLabel htmlFor="email-alerts" className="mb-0 mr-2">
      Enable email alerts?
    </FormLabel>
    <Switch aria-label="example switch" id="email-alerts" />
  </FormControl>
);
*/
