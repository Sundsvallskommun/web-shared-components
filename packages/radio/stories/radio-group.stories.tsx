import React from 'react';
import { Radio, RadioGroupProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Radioknappar/Komponent/Grupp',
  component: Radio,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: RadioGroupProps) => (
  <div className="flex flex-col space-y-4">
    <Radio.Group {...args}>
      <Radio value="1">Exempel 1</Radio>
      <Radio value="2">Exempel 2</Radio>
      <Radio value="3">Exempel 3</Radio>
    </Radio.Group>
  </div>
);

Template.storyName = 'Grupp';
