import React from 'react';
import { Divider, DividerProps } from '../src/divider';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Divider',
  component: Divider,
  tags: ['autodocs'],
} as Meta<typeof Divider>;

export const Template = (args: DividerProps) => (
  <div className="p-6">
    <div className="flex items-center gap-12 p-6">
      <p className="">Ljus bakgrund</p>
      <Divider {...args} className="flex-1" />
    </div>
  </div>
);

Template.storyName = 'Divider';
