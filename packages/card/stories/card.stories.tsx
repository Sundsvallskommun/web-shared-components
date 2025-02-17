import { Meta } from '@storybook/react';
import React from 'react';
import PlaceholderImage from '../../../.storybook/public/placeholder_2.png';
import { Card, CardProps } from '../src';

export default {
  title: 'Komponenter/Card',
  component: Card.Component,
  tags: ['autodocs'],
  argTypes: {
    href: {
      type: { name: 'string', required: false },
      description: 'Sets href',
      table: {
        defaultValue: { summary: undefined },
      },
      control: 'text',
      defaultValue: undefined,
    },
    target: {
      type: { name: 'string', required: false },
      description: 'Sets target',
      table: {
        defaultValue: { summary: undefined },
      },
      control: 'text',
      defaultValue: undefined,
    },
    useHoverEffect: {
      type: { name: 'string', required: false },
      description: 'Sets useHoverEffect',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
    className: {
      type: { name: 'string', required: false },
      description: 'Sets className',
      table: {
        defaultValue: { summary: undefined },
      },
      control: 'text',
      defaultValue: undefined,
    },
    invert: {
      type: { name: 'string', required: false },
      description: 'Sets invert',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
    layout: {
      type: { name: 'string', required: false },
      description: 'Sets layout',
      table: {
        defaultValue: { summary: 'vertical' },
      },
      options: [undefined, 'vertical', 'horizontal'],
      control: 'select',
      defaultValue: '',
    },
    color: {
      type: { name: 'string', required: false },
      description: 'Sets color',
      table: {
        defaultValue: { summary: '' },
      },
      options: [undefined, 'mono', 'tertiary', 'vattjom', 'gronsta', 'bjornstigen', 'juniskar'],
      control: 'select',
      defaultValue: '',
    },
  },
} as Meta<typeof Card.Component>;

const inputDate = new Date();

export const Template = (args: React.ComponentPropsWithRef<CardProps['Component']>) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
    <Card {...args}>
      <Card.Image src={PlaceholderImage} alt="placeholder" />
      <Card.Body>
        <Card.Header>
          <h2>Rubrik</h2>
        </Card.Header>
        <Card.Text>
          <p>
            Amet enim adipiscing congue justo adipiscing sagittis volutpat nibh ac. Integer viverra lectus in quisque.
            In nisl mauris faucibus egestas quis mi nam.
          </p>
        </Card.Text>
      </Card.Body>
    </Card>

    <Card {...args}>
      <Card.Image src={PlaceholderImage} alt="placeholder" />
      <Card.Body>
        <Card.Meta datetime={inputDate}></Card.Meta>
        <Card.Header>
          <h2>Rubrik</h2>
        </Card.Header>
        <Card.Text>
          <p>
            Amet enim adipiscing congue justo adipiscing sagittis volutpat nibh ac. Integer viverra lectus in quisque.
            In nisl mauris faucibus egestas quis mi nam.
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
);

Template.storyName = 'Card';
