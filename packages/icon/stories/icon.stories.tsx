import { Meta } from '@storybook/react';
import { Check } from 'lucide-react';
import { Icon, IconProps } from '../src/icon';

export default {
  title: 'Komponenter/Icon/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    icon: <Check />,
  },
} as Meta<typeof Icon>;

export const Template = (props: IconProps) => <Icon {...props} />;

Template.storyName = 'Icon';
