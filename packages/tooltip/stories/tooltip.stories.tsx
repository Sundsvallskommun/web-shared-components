import { Tooltip, TooltipProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} as Meta<typeof Tooltip>;

export const Template = (args: TooltipProps) => (
  <div style={{ height: '4rem' }}>
    <Tooltip {...args}>My tooltip</Tooltip>
  </div>
);

Template.storyName = 'Tooltip';
