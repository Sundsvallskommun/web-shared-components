import { Button } from '@sk-web-gui/button';
import { Meta } from '@storybook/react';
import React from 'react';
import { Badge, BadgeProps } from '../src';
import MessageIcon from '@mui/icons-material/Message';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export default {
  title: 'Komponenter/Badge/Komponent',
  component: Badge,
  tags: ['autodocs'],
  args: {
    color: 'primary',
  },
} as Meta;

export const Template = (args: BadgeProps) => <Badge {...args} />;

Template.storyName = 'Badge';

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
        <Button variant="primary" className="bg-gray-200">
          Standard no border md
          <Badge size="md" variant="solid" color="warning" max={99} counter={4} position={'standard'} noBorder />
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
        <Button variant="primary" className="bg-gray-200">
          Super lg no border
          <Badge size="lg" variant="solid" color="warning" max={99} counter={4} position={'super'} noBorder />
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
        <Button variant="primary" className="bg-gray-200">
          Superoverlap lg no border
          <Badge size="lg" variant="solid" color="warning" max={99} counter={4} position={'super-overlap'} noBorder />
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

BadgeOnElement.storyName = 'Badge on element';
