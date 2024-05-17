import { Meta } from '@storybook/react';
import { Icon, IconProps } from '../src';

export default {
  title: 'Komponenter/Icon/Icon.Padded',
  component: Icon.Padded,
  tags: ['autodocs'],
  args: {
    name: 'check',
  },
} as Meta<typeof Icon.Padded>;

export const Template = (props: React.ComponentProps<typeof Icon.Padded>) => <Icon.Padded {...props} />;

Template.storyName = 'IconPadded';
