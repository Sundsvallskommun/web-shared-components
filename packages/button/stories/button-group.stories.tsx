import React from 'react';
import { Meta } from '@storybook/react';
import { Button, ButtonProps } from '../src';
import Icon from '@sk-web-gui/icon';

export default {
  title: 'Komponenter/Button/Button.Group',
  component: Button.Group,
  tags: ['autodocs'],
} as Meta<typeof Button.Group>;

export const Template = ({ ...args }: ButtonProps) => (
  <div className="space-y-4">
    <div>
      <Button.Group {...args}>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Button.Group>
    </div>

    <div>
      <Button.Group {...args}>
        <Button iconButton>
          <Icon name="align-start-vertical" />
        </Button>

        <Button iconButton>
          <Icon name="align-center-vertical" />
        </Button>

        <Button iconButton>
          <Icon name="align-end-vertical" />
        </Button>

        <Button iconButton>
          <Icon name="circle-arrow-down" />
        </Button>
      </Button.Group>
    </div>
  </div>
);

Template.storyName = 'Button Group';
