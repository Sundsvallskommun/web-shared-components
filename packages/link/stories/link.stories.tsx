import React from 'react';
import { Link, LinkProps } from '../src';

export default {
  title: 'Komponenter/Länkar/Komponent',
  component: Link,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = (args: LinkProps) => (
  <div className="flex flex-col space-y-2">
    <Link {...args} href="#">
      Lorem ipsum dolor sit amet.
    </Link>
    <p>
      <Link {...args} href="#">
        Lorem, ipsum dolor.
      </Link>{' '}
      Lorem ipsum dolor sit amet consectetur adipisicing.
    </p>
  </div>
);

Template.storyName = 'Link';

Template.argTypes = {
  disabled: {
    type: { name: 'string', required: false },
    description: 'Sets disabled',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  external: {
    type: { name: 'string', required: false },
    description: 'Sets external',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
};
