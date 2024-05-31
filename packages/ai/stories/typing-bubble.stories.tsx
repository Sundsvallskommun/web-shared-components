import { Meta } from '@storybook/react';
import { TypingBubble } from '../src';
import { TypingBubbleProps } from '../src/components';

export default {
  title: 'AI/Komponenter/TypingBubble',
  component: TypingBubble,
  tags: ['autodocs'],
} as Meta<TypingBubbleProps>;

export const Template = (args: TypingBubbleProps) => <TypingBubble {...args} />;
