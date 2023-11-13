import { FormControl, FormHelperText, FormLabel } from '@sk-web-gui/forms';
import { Meta } from '@storybook/react';
import React from 'react';
import { Checkbox, CheckboxGroupProps } from '../src/checkbox';

export default {
  title: 'Komponenter/Checkbox/Checkbox.Group',
  component: Checkbox.Group,
  tags: ['autodocs'],
} as Meta<typeof Checkbox.Group>;

export const Template = (args: CheckboxGroupProps) => (
  <FormControl>
    <FormLabel>Label</FormLabel>
    <Checkbox.Group {...args} defaultValue={['one', 'three']}>
      <Checkbox value="one">One</Checkbox>
      <Checkbox value="two">Two</Checkbox>
      <Checkbox value="three">Three</Checkbox>
    </Checkbox.Group>
    <FormHelperText>Hjälptext, Lorem ipsum dolor sit amet.</FormHelperText>
  </FormControl>
);

Template.storyName = 'Checkbox.Group';
