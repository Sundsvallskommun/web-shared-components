import { Meta } from '@storybook/react';
import { LucideIconProps } from '../src/lucide-icon';
import LucideIconPadded from '../src/lucide-icon-padded';

export default {
  title: 'Komponenter/Icon/LucideIcon.Padded',
  component: LucideIconPadded,
  tags: ['autodocs'],
  args: {
    name: 'check',
  },
} as Meta<typeof LucideIconPadded>;

export const Template = (props: LucideIconProps) => <LucideIconPadded {...props} />;

Template.storyName = 'LucideIconPadded';
