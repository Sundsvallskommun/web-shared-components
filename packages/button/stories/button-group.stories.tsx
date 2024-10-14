import { Meta } from '@storybook/react';
import { Button, ButtonProps } from '../src';
import { Icon } from '@sk-web-gui/icon';
import { AlignStartVertical, AlignCenterVertical, AlignEndVertical, CircleArrowDown } from 'lucide-react';

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
          <Icon icon={<AlignStartVertical />} />
        </Button>

        <Button iconButton>
          <Icon icon={<AlignCenterVertical />} />
        </Button>

        <Button iconButton>
          <Icon icon={<AlignEndVertical />} />
        </Button>

        <Button iconButton>
          <Icon icon={<CircleArrowDown />} />
        </Button>
      </Button.Group>
    </div>
  </div>
);

Template.storyName = 'Button Group';
