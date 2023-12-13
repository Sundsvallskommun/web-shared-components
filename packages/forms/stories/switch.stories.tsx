import { FormControl } from '../src';
import { Switch, SwitchProps } from '../src/switch';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
} as Meta;

export const Template = (args: SwitchProps) => (
  <div>
    <FormControl fieldset>
      <Switch {...args}>Alla lampor</Switch>
    </FormControl>
  </div>
);

Template.storyName = 'Switch';
