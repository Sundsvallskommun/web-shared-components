import React from 'react';
import { FormControl, FormHelperText, FormLabel } from '@sk-web-gui/forms';
import { Radio, RadioProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Radioknappar/Komponent',
  component: Radio,
  tags: ['autodocs'],
} as Meta;

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

Template.storyName = 'Radio';

export const Invaliderad = () => (
  <div className="space-x-2">
    <Radio invalid name="invalid">
      First
    </Radio>
    <Radio invalid name="invalid" defaultChecked>
      Second
    </Radio>
  </div>
);

export const Inaktiverad = () => (
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

export const Storlekar = () => (
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

export const FormControlComp = () => (
  <FormControl>
    <FormLabel>Favorite Naruto Character</FormLabel>
    <Radio.Group defaultValue="2" className="space-x-4" inline>
      <Radio value="1">First</Radio>
      <Radio value="2">Second</Radio>
      <Radio value="3">Third</Radio>
    </Radio.Group>
    <FormHelperText>Helpertext</FormHelperText>
  </FormControl>
);

FormControlComp.storyName = 'FormControl';
