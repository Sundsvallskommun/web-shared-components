import { Meta } from '@storybook/react';
import React from 'react';
import { RadioButton, RadioButtonGroupProps } from '../src';

export default {
  title: 'Komponenter/RadioButton/RadioButton.Group',
  component: RadioButton.Group,
  tags: ['autodocs'],
} as Meta<typeof RadioButton.Group>;

export const Template = (args: RadioButtonGroupProps) => (
  <div className="flex flex-col space-y-4">
    <RadioButton.Group {...args}>
      <RadioButton value="1" name="sk-example">
        Exempel 1
      </RadioButton>
      <RadioButton value="2" name="sk-example">
        Exempel 2
      </RadioButton>
      <RadioButton value="3" name="sk-example">
        Exempel 3
      </RadioButton>
    </RadioButton.Group>
  </div>
);

Template.storyName = 'Grupp';
