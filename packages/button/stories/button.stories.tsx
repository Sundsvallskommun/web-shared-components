import SignalWifi2BarOutlinedIcon from '@mui/icons-material/SignalWifi2BarOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Meta } from '@storybook/react';
import { Button, ButtonProps } from '../src';
import React from 'react';
import { Announcement } from './announcement';

export default {
  title: 'Komponenter/Knappar/Komponent',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Knapptext',
    color: 'primary',
  },
} as Meta;

export const Template = ({ children, ...args }: ButtonProps) => (
  <div className="flex flex-col items-start space-y-2">
    <Button {...args}>{args.iconButton ? <SignalWifi2BarOutlinedIcon /> : children}</Button>
    <Button {...args} leftIcon={<CheckOutlinedIcon />}>
      {args.iconButton ? '' : children}
    </Button>
  </div>
);

Template.storyName = 'Button';

export const Grupp = () => (
  <div className="space-y-4">
    <div>
      <Button.Group variant="solid" color="primary" className="space-x-2">
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Button.Group>
    </div>

    <div>
      <Button.Group variant="solid" color="orange" className="space-x-2">
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Button.Group>
    </div>

    <div>
      <Button.Group variant="solid" color="primary" className="space-x-2">
        <Button iconButton>
          <Announcement size={16} />
        </Button>

        <Button iconButton>
          <Announcement size={16} />
        </Button>

        <Button iconButton>
          <Announcement size={16} />
        </Button>

        <Button iconButton>
          <Announcement size={16} />
        </Button>
      </Button.Group>
    </div>
  </div>
);

export const Fastsittandes = () => (
  <div className="space-y-4">
    <div>
      <Button.Group variant="solid" attached>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Button.Group>
    </div>

    <div>
      <Button.Group variant="solid" size="lg" attached>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Button.Group>
    </div>

    <div>
      <Button.Group variant="solid" color="primary" attached>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Button.Group>
    </div>

    <div>
      <Button.Group variant="solid" attached>
        <Button>Button</Button>
        <Button color="primary">Button</Button>
        <Button color="secondary">Button</Button>
        <Button>Button</Button>
      </Button.Group>
    </div>

    <div>
      <Button.Group variant="solid" attached>
        <Button iconButton>
          <Announcement size={16} />
        </Button>

        <Button iconButton>
          <Announcement size={16} />
        </Button>

        <Button iconButton>
          <Announcement size={16} />
        </Button>

        <Button iconButton>
          <Announcement size={16} />
        </Button>
      </Button.Group>
    </div>

    <div>
      <Button.Group variant="solid" attached>
        <Button iconButton>
          <Announcement size={32} />
        </Button>

        <Button iconButton>
          <Announcement size={32} />
        </Button>

        <Button iconButton>
          <Announcement size={32} />
        </Button>

        <Button iconButton>
          <Announcement size={32} />
        </Button>
      </Button.Group>
    </div>
  </div>
);
