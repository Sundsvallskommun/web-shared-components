import { Link, LinkProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    href: '#',
  },
  argTypes: {
    external: {
      type: { name: 'string', required: false },
      description: 'Sets external',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
    hideExternalIcon: {
      type: { name: 'string', required: false },
      description: 'Sets hideExternalIcon',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      type: { name: 'string', required: false },
      description: 'Sets disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
    strong: {
      type: { name: 'string', required: false },
      description: 'Sets strong',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      type: { name: 'string', required: false },
      description: 'Sets size',
      table: {
        defaultValue: { summary: '' },
      },
      options: [undefined, 'sm', 'md', 'lg', 'xl'],
      control: 'select',
      defaultValue: '',
    },
    variant: {
      type: { name: 'string', required: false },
      description: 'Sets variant',
      table: {
        defaultValue: { summary: 'primary' },
      },
      options: ['primary', 'tertiary'],
      control: 'select',
      defaultValue: 'primary',
    },
    inverted: {
      type: { name: 'string', required: false },
      description: 'Inverted colors',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta<LinkProps>;

export const Template = (args: LinkProps) => <Link {...args}>En länk</Link>;

Template.storyName = 'Link';
