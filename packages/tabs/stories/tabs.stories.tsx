import React from 'react';
import { Tabs, TabsProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} as Meta<typeof Tabs>;

export const Template = (args: TabsProps) => {
  return <Tabs {...args}></Tabs>;
};

Template.storyName = 'Tabs';
