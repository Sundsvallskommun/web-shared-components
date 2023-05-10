import React from 'react';
import { Divider, DividerProps } from '../src';

export default {
  title: 'Komponenter/Avdelare/Komponent',
  component: Divider,
  tags: ['autodocs'],
};

export const Template = (args: DividerProps) => (
  <div className="p-6">
    <div className="flex items-center gap-12 p-6">
      <p className="">Ljus bakgrund</p>
      <Divider {...args} className="flex-1" />
    </div>

    <div className="flex items-center gap-12 p-6 bg-gray text-white">
      <p className="">Mörk bakgrund</p>
      <Divider {...args} className="flex-1" />
    </div>
  </div>
);

Template.storyName = 'Divider';
