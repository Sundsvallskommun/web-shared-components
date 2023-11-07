import React from 'react';
import { Icon, IconProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Ikoner/Komponent',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: 'check',
  },
} as Meta;

export const Template = (props: IconProps) => (
  <div className="flex space-x-6">
    <Icon {...props} />
  </div>
);

Template.storyName = 'Icon';
