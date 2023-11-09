import React from 'react';
import { Radio, RadioGroup, RadioGroupProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Radioknappar/Komponent/Grupp',
  component: RadioGroup,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: RadioGroupProps) => (
  <div className="flex flex-col space-y-4">
    <Radio.Group {...args}>
      <Radio value="1" name="sk-example">
        Exempel 1
      </Radio>
      <Radio value="2" name="sk-example">
        Exempel 2
      </Radio>
      <Radio value="3" name="sk-example">
        Exempel 3
      </Radio>
    </Radio.Group>
  </div>
);

Template.storyName = 'Grupp';
