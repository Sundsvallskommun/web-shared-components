import React from 'react';
import { Meta } from '@storybook/react';
import { Avatar, AvatarProps } from '../src';

export default {
  title: 'Komponenter/Avatar/Komponent',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    separator: '/',
  },
} as Meta;

export const Template = (args: AvatarProps) => (
  <div className="flex flex-col space-y-2">
    <Avatar {...args} />
  </div>
);

Template.storyName = 'Breadcrumb';
