import { Logo, LogoProps } from '../src';
import { Meta } from '@storybook/react';
import React from 'react';

export default {
  title: 'Komponenter/Logo',
  component: Logo,
  tags: ['autodocs'],
  args: {
    title: 'En service',
  },
} as Meta<typeof Logo>;

export const Template = (args: LogoProps) => (
  <div className="w-full flex h-[10rem]">
    <Logo {...args} />
  </div>
);

Template.storyName = 'Logo';
