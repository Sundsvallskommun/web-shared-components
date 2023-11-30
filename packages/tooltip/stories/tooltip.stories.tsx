import React from 'react';
import { Tooltip, TooltipProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} as Meta<typeof Tooltip>;

export const Template = (args: TooltipProps) => <Tooltip {...args}>Tooltip</Tooltip>;

Template.storyName = 'Tooltip';
