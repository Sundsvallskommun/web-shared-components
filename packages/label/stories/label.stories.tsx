import React from 'react';
import { Label, LabelProps } from '../src';

export default {
  title: 'Komponenter/Etikett/Komponent',
  component: Label,
  tags: ['autodocs'],
};

export const Template = (args: LabelProps) => (
  <div className="flex flex-row gap-8">
    <Label {...args}>Kategori 1</Label>
    <Label {...args}>Kategori 2</Label>
    <Label {...args}>Kategori 3</Label>
  </div>
);

Template.storyName = 'Label';
