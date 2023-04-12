import React from 'react';
import { Link, LinkProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Länkar/Komponent',
  component: Link,
  tags: ['autodocs'],
  args: {
    href: '#',
  },
} as Meta;

export const Template = (args: LinkProps) => (
  <div className="flex flex-col space-y-2">
    <Link {...args}>Lorem ipsum dolor sit amet.</Link>
    <p>
      <Link {...args}>Lorem, ipsum dolor.</Link> Lorem ipsum dolor sit amet consectetur adipisicing.
    </p>
  </div>
);

Template.storyName = 'Link';
