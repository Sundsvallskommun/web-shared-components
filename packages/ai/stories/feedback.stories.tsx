import { Meta } from '@storybook/react';
import { Feedback, FeedbackProps } from '../src/components';

export default {
  title: 'AI/Komponenter/Feedback',
  component: Feedback,
  tags: ['autodocs'],
} as Meta<FeedbackProps>;

export const Template = (args: FeedbackProps) => <Feedback {...args} />;
