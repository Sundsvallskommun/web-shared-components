import { Button } from '@sk-web-gui/button';
import { Meta } from '@storybook/react';
import React from 'react';
import { Badge, BadgeProps } from '../src';
import MessageIcon from '@mui/icons-material/Message';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export default {
  title: 'WIP/Komponenter/Badge',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  component: Badge,
} as Meta;

export const Template = (args: BadgeProps) => <Badge {...args} />;

Template.story = { name: 'Komponent' };

Template.argTypes = {
  counter: {
    type: { name: 'number', required: false },
    description: 'Sets numbered value',
    table: {
      defaultValue: { summary: 4 },
    },
    control: { type: 'number', min: 1, max: 200, step: 1 },
    defaultValue: 4,
  },
  max: {
    type: { name: 'number', required: false },
    description: 'Sets max value that can appear',
    table: {
      defaultValue: { summary: 99 },
    },
    control: { type: 'number', min: 1, max: 1000, step: 1 },
    defaultValue: 99,
  },
  variant: {
    type: { name: 'string', required: false },
    description: 'Sets variant',
    table: {
      defaultValue: { summary: 'solid' },
    },
    options: ['solid', 'outline'],
    control: 'select',
    defaultValue: 'solid',
  },

  size: {
    type: { name: 'string', required: false },
    description: 'Sets size',
    table: {
      defaultValue: { summary: 'sm' },
    },
    options: ['sm', 'md', 'lg'],
    control: 'select',
    defaultValue: 'sm',
  },

  color: {
    type: { name: 'string', required: false },
    description: 'Sets color',
    table: {
      defaultValue: { summary: 'primary' },
    },
    options: ['primary', 'warning', 'error', 'neutral'],
    control: { type: 'select' },
    defaultValue: 'primary',
  },
  position: {
    type: { name: 'string', required: false },
    description: 'Sets posiiton of badge when inline in another component',
    table: {
      defaultValue: { summary: '' },
    },
    options: ['standard', 'super', 'super-overlap', 'none'],
    control: { type: 'select' },
    defaultValue: '',
  },
};

export const BadgeOnElement = () => {
  return (
    <div className="grid grid-col-3 gap-16">
      <div className="flex gap-20">
        <Button>
          Standard sm
          <Badge size="sm" variant="solid" color="warning" max={99} counter={4} position={'standard'} />
        </Button>
        <Button>
          Standard md
          <Badge size="md" variant="solid" color="warning" max={99} counter={4} position={'standard'} />
        </Button>
        <Button>
          Standard lg
          <Badge size="lg" variant="solid" color="warning" max={99} counter={4} position={'standard'} />
        </Button>
      </div>
      <div className="flex gap-20">
        <Button>
          Super sm
          <Badge size="sm" variant="solid" color="warning" max={99} counter={4} position={'super'} />
        </Button>
        <Button>
          Super md
          <Badge size="md" variant="solid" color="warning" max={99} counter={4} position={'super'} />
        </Button>
        <Button>
          Super lg
          <Badge size="lg" variant="solid" color="warning" max={99} counter={4} position={'super'} />
        </Button>
      </div>
      <div className="flex gap-20">
        <Button>
          Superoverlap sm
          <Badge size="sm" variant="solid" color="warning" max={99} counter={4} position={'super-overlap'} />
        </Button>
        <Button>
          Superoverlap md
          <Badge size="md" variant="solid" color="warning" max={99} counter={4} position={'super-overlap'} />
        </Button>
        <Button>
          Superoverlap lg
          <Badge size="lg" variant="solid" color="warning" max={99} counter={4} position={'super-overlap'} />
        </Button>
      </div>
      <div className="flex gap-20">
        <Button className="w-fit">
          <Badge size="sm" variant="solid" color="warning" max={99} counter={4} />
          No positioning sm
        </Button>
        <Button className="w-fit">
          <Badge size="md" variant="solid" color="warning" max={99} counter={4} />
          No positioning md
        </Button>
        <Button className="w-fit">
          <Badge size="lg" variant="solid" color="warning" max={99} counter={4} />
          No positioning lg
        </Button>
      </div>
      <div className="flex gap-20">
        <span>on icon - sibling inside a div</span>
        <div>
          <MessageIcon fontSize="large" />
          <Badge size="md" variant="solid" color="warning" max={99} counter={4} position={'super-overlap'} />
        </div>
        <div>
          <MenuIcon fontSize="large" />
          <Badge size="md" variant="solid" color="warning" max={99} counter={4} position={'standard'} />
        </div>
        <div>
          <MenuIcon fontSize="large" />
          <Badge size="md" variant="solid" color="warning" max={99} counter={4} position={'super'} />
        </div>
        <div>
          <MenuIcon fontSize="large" />
          <Badge size="md" variant="solid" color="warning" max={99} counter={4} position={'super-overlap'} />

          <NotificationsNoneOutlinedIcon sx={{ fontSize: '2.6rem' }} />
          <Badge size="md" variant="solid" color="error" max={99} counter={4} position={'super-overlap'} />
        </div>
        <div>
          <NotificationsNoneOutlinedIcon sx={{ fontSize: '2.6rem' }} />
          <Badge size="md" variant="solid" color="error" max={99} counter={4} position={'super'} />
        </div>
      </div>
      <div className="flex gap-20">
        <span>inside button Custom absolute and right</span>
        <Button className="w-fit">
          <Badge
            className="absolute right-[-14px]"
            size="lg"
            variant="solid"
            color="warning"
            max={99}
            counter={4}
            position={'super-overlap'}
          />
          custom absolute lg
        </Button>
      </div>
    </div>
  );
};

BadgeOnElement.story = 'Badge on element';
