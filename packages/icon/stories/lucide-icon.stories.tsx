import { Meta } from '@storybook/react';
import LucideIcon, { LucideIconProps } from '../src/lucide-icon';

export default {
  title: 'Komponenter/Icon/LucideIcon',
  component: LucideIcon,
  tags: ['autodocs'],
  args: {
    name: 'check',
  },
} as Meta<typeof LucideIcon>;

export const Template = (props: LucideIconProps) => <LucideIcon {...props} />;

Template.storyName = 'LucideIcon';
