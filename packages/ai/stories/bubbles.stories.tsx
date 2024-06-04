import { Meta } from '@storybook/react';
import { Bubble } from '../src';
import { BubbleProps } from '../src/components';

export default {
  title: 'AI/Komponenter/Bubble',
  component: Bubble,
  tags: ['autodocs'],
} as Meta<BubbleProps>;

export const Template = (args: BubbleProps) => <Bubble {...args}>Fråga</Bubble>;
