import React from 'react';
import { FormControl, FormHelperText, FormLabel } from '@sk-web-gui/forms';
import { Radio, RadioGroupProps, RadioProps } from '../src';

export default {
  title: 'Komponenter/Radioknappar/Komponent',
  component: Radio,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = (args: RadioProps) => (
  <>
    <Radio {...args} className="m-2" name="example">
      Exempel 1
    </Radio>
    <Radio {...args} className="m-2" name="example">
      Exempel 2
    </Radio>
    <Radio {...args} className="m-2" name="example">
      Exempel 2
    </Radio>
  </>
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
  defaultChecked: {
    type: { name: 'boolean', required: false },
    description: 'Sets default checked',
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

Template.storyName = 'Radio';

export const invaliderad = () => (
  <div className="space-x-2">
    <Radio invalid name="invalid">
      First
    </Radio>
    <Radio invalid name="invalid" defaultChecked>
      Second
    </Radio>
  </div>
);

export const inaktiverad = () => (
  <div className="space-x-2">
    <Radio disabled name="disabled">
      First
    </Radio>
    <Radio disabled name="disabled" defaultChecked>
      Second
    </Radio>

    <Radio readOnly name="readOnly">
      First
    </Radio>
    <Radio readOnly name="readOnly" defaultChecked>
      Second
    </Radio>
  </div>
);

export const storlekar = () => (
  <div className="space-x-2">
    <Radio size="sm" name="size">
      Radio
    </Radio>
    <Radio size="md" name="size">
      Radio
    </Radio>
    <Radio size="lg" name="size">
      Radio
    </Radio>
    <Radio size="lg" name="size">
      Radio
    </Radio>
  </div>
);

export const formControl = () => (
  <FormControl>
    <FormLabel>Favorite Naruto Character</FormLabel>
    <Radio.Group defaultValue="2" className="space-x-4" inline>
      <Radio value="1">First</Radio>
      <Radio value="2">Second</Radio>
      <Radio value="3">Third</Radio>
    </Radio.Group>
    <FormHelperText>Select only if you're a fan.</FormHelperText>
  </FormControl>
);
