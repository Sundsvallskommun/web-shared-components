import React from 'react';
import { Icon, IconProps } from '../src/icon';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: 'check',
  },
} as Meta<typeof Icon>;

export const Template = (props: IconProps) => <Icon {...props} />;

Template.storyName = 'Icon';
