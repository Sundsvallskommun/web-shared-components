import React from 'react';
import { FormControl, FormHelperText, FormLabel } from '@sk-web-gui/forms';
import { Checkbox, CheckboxProps } from '../src';

export default {
  title: 'Komponenter/Kryssrutor/Komponent',
  component: Checkbox,
  tags: ['autodocs'],
};

export const Template = (args: CheckboxProps) => (
  <div className="space-x-8">
    <Checkbox {...args}>Checkbox</Checkbox>
    <Checkbox {...args}>Checkbox</Checkbox>
  </div>
);

Template.storyName = 'Checkbox';

export const Invaliderad = () => (
  <div className="flex space-x-8">
    <Checkbox invalid>Checkbox</Checkbox>
    <Checkbox invalid defaultChecked>
      Checkbox
    </Checkbox>
  </div>
);

export const Inaktiverad = () => (
  <>
    <div className="flex space-x-8">
      <Checkbox disabled>Checkbox</Checkbox>
      <Checkbox disabled defaultChecked>
        Checkbox
      </Checkbox>
      <Checkbox readOnly>Checkbox</Checkbox>
      <Checkbox readOnly defaultChecked>
        Checkbox
      </Checkbox>
    </div>
  </>
);

export const Storlekar = () => (
  <div className="flex flex-col">
    <Checkbox size="sm">Checkbox (small)</Checkbox>
    <Checkbox size="md" defaultChecked>
      Checkbox (medium)
    </Checkbox>
    <Checkbox size="lg">Checkbox (large)</Checkbox>
  </div>
);

export const Grupp = () => (
  <div className="flex flex-col space-y-4">
    <Checkbox.Group className="space-x-4" inline defaultValue={['lorem', 'ipsum']}>
      <Checkbox value="lorem">lorem</Checkbox>
      <Checkbox value="dolor">dolor</Checkbox>
      <Checkbox value="ipsum">ipsum</Checkbox>
    </Checkbox.Group>

    <Checkbox.Group className="space-x-4" inline defaultValue={['lorem', 'ipsum']} color="orange">
      <Checkbox value="lorem">lorem</Checkbox>
      <Checkbox value="dolor">dolor</Checkbox>
      <Checkbox value="ipsum">ipsum</Checkbox>
    </Checkbox.Group>
  </div>
);

export const FormControlComp = () => (
  <FormControl>
    <FormLabel>Label</FormLabel>
    <Checkbox.Group className="space-x-4" inline defaultValue={['ett', 'tre']}>
      <Checkbox value="ett">ett</Checkbox>
      <Checkbox value="två">två</Checkbox>
      <Checkbox value="tre">tre</Checkbox>
    </Checkbox.Group>
    <FormHelperText>Hjälptext, Lorem ipsum dolor sit amet.</FormHelperText>
  </FormControl>
);
FormControlComp.storyName = 'Formulär';
