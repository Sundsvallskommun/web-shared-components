import { Meta } from '@storybook/react';
import { IconProps } from '../src/icon';
import { Check } from 'lucide-react';
import IconPadded from '../src/icon-padded';

export default {
  title: 'Komponenter/Icon/Icon.Padded',
  component: IconPadded,
  tags: ['autodocs'],
  args: {
    icon: <Check />,
  },
} as Meta<typeof IconPadded>;

export const Template = (props: IconProps) => <IconPadded {...props} />;

Template.storyName = 'IconPadded';
