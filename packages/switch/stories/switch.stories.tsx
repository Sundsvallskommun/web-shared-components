import React from 'react';
import { FormControl, FormLabel } from '@sk-web-gui/forms';
import { Switch, SwitchProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Toggel/Komponent',
  component: Switch,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: SwitchProps) => (
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

Template.storyName = 'Switch';

export const Inaktiverad = () => (
  <div className="space-x-2">
    <Switch aria-label="example switch" disabled />
    <Switch aria-label="example switch 2" defaultChecked disabled />
  </div>
);

export const Storlekar = () => (
  <div className="space-x-2">
    <Switch aria-label="example switch" size="sm" />
    <Switch aria-label="example switch 2" size="md" />
    <Switch aria-label="example switch 3" size="lg" />
  </div>
);

export const FormControlComp = () => (
  <FormControl className="flex items-center">
    <FormLabel htmlFor="email-alerts" className="mb-0 mr-2">
      Enable email alerts?
    </FormLabel>
    <Switch aria-label="example switch" id="email-alerts" />
  </FormControl>
);

FormControlComp.storyName = 'FormControl';
