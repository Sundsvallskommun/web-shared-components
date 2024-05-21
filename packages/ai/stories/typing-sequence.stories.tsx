import { Meta } from '@storybook/react';
import React from 'react';
import { TypingSequence } from '../src';
import { TypingSequenceProps } from '../src/components';

export default {
  title: 'AI/Komponenter/TypingSequence',
  component: TypingSequence,
  tags: ['autodocs'],
} as Meta<TypingSequenceProps>;

export const Template = (args: TypingSequenceProps) => <TypingSequence {...args} />;
