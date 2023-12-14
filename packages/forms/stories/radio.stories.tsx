import React from 'react';
import { FormControl, FormHelperText, FormLabel } from '@sk-web-gui/forms';
import { Meta } from '@storybook/react';
import { RadioButton, RadioButtonProps } from '../src';

export default {
  title: 'Komponenter/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
} as Meta<typeof RadioButton>;

export const Template = (args: RadioButtonProps) => (
  <fieldset className="flex flex-row gap-12">
    <RadioButton {...args} name="sk-example">
      Exempel 1
    </RadioButton>
    <RadioButton {...args} name="sk-example">
      Exempel 2
    </RadioButton>
    <RadioButton {...args} name="sk-example">
      Exempel 2
    </RadioButton>
  </fieldset>
);

Template.storyName = 'RadioButton';

export const Invaliderad = () => (
  <div className="space-x-2">
    <RadioButton invalid name="invalid">
      First
    </RadioButton>
    <RadioButton invalid name="invalid" defaultChecked>
      Second
    </RadioButton>
  </div>
);

export const Inaktiverad = () => (
  <div className="space-x-2">
    <RadioButton disabled name="disabled">
      First
    </RadioButton>
    <RadioButton disabled name="disabled" defaultChecked>
      Second
    </RadioButton>

    <RadioButton readOnly name="readOnly">
      First
    </RadioButton>
    <RadioButton readOnly name="readOnly" defaultChecked>
      Second
    </RadioButton>
  </div>
);

export const Storlekar = () => (
  <div className="space-x-2">
    <RadioButton size="sm" name="size">
      RadioButton
    </RadioButton>
    <RadioButton size="md" name="size">
      RadioButton
    </RadioButton>
    <RadioButton size="lg" name="size">
      RadioButton
    </RadioButton>
  </div>
);

export const FormControlComp = () => (
  <FormControl>
    <FormLabel>Favorite Naruto Character</FormLabel>
    <RadioButton.Group defaultValue="2" className="space-x-4" inline>
      <RadioButton value="1">First</RadioButton>
      <RadioButton value="2">Second</RadioButton>
      <RadioButton value="3">Third</RadioButton>
    </RadioButton.Group>
    <FormHelperText>Helpertext</FormHelperText>
  </FormControl>
);

FormControlComp.storyName = 'FormControl';
