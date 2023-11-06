import React from 'react';
import { Meta } from '@storybook/react';
import { Badge, BadgeProps } from '../src';

export default {
  title: 'Komponenter/Badge/Komponent',
  component: Badge,
  tags: ['autodocs'],
  args: {
    counter: '1',
  },
} as Meta;

export const Template = (args: BadgeProps) => <Badge {...args} />;

Template.storyName = 'Badge';
