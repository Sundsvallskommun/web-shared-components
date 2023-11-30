import React from 'react';
import { Label, LabelProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Label',
  component: Label,
  tags: ['autodocs'],
} as Meta<typeof Label>;

export const Template = (args: LabelProps) => (
  <div className="flex flex-row gap-8">
    <Label {...args}>Kategori 1</Label>
    <Label {...args}>Kategori 2</Label>
    <Label {...args}>Kategori 3</Label>
  </div>
);

Template.storyName = 'Label';
