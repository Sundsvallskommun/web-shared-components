import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from '../src';
import { Icon } from '@sk-web-gui/icon';
import { CandyCane } from 'lucide-react';
import { expect, fn, userEvent, within } from '@storybook/test';

export default {
  title: 'Komponenter/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Knapptext',
    color: 'primary',
  },
  argTypes: {
    disabled: {
      type: { name: 'string', required: false },
      description: 'Sets disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
    inverted: {
      type: { name: 'string', required: false },
      description: 'Sets inverted style',
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
        defaultValue: { summary: 'md' },
      },
      options: ['sm', 'md', 'lg'],
      control: 'select',
      defaultValue: 'md',
    },
    loading: {
      type: { name: 'string', required: false },
      description: 'Sets loading spinner',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
    loadingText: {
      type: { name: 'string', required: false },
      description: 'Sets loading text',
      table: {
        defaultValue: { summary: '' },
      },
      control: 'text',
      defaultValue: '',
    },
    variant: {
      type: { name: 'string', required: false },
      description: 'Sets variant',
      table: {
        defaultValue: { summary: 'outline' },
      },
      options: ['link', 'primary', 'secondary', 'tertiary'],
      control: 'select',
      defaultValue: 'primary',
    },
    type: {
      type: { name: 'string', required: false },
      description: 'Sets type',
      table: {
        defaultValue: { summary: 'button' },
      },
      options: ['reset', 'button', 'submit'],
      control: 'select',
      defaultValue: 'button',
    },
    color: {
      type: { name: 'string', required: false },
      description: 'Sets color',
      table: {
        defaultValue: { summary: 'primary' },
      },
      options: [undefined, 'primary', 'gronsta', 'vattjom', 'juniskar', 'bjornstigen', 'error', 'warning', 'success'],
      control: 'select',
      defaultValue: 'primary',
    },
    rounded: {
      type: { name: 'string', required: false },
      description: 'Sets rounded variant',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
    iconButton: {
      type: { name: 'string', required: false },
      description: 'Sets if icon button',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      defaultValue: false,
    },
    'aria-disabled': {
      type: { name: 'string', required: false },
      description: 'Sets aria-disabled',
      table: {
        defaultValue: { summary: undefined },
      },
      options: [undefined, 'true', 'false'],
      control: 'select',
      defaultValue: undefined,
    },
  },
} as Meta<typeof Button>;

export const Template = ({ children, ...args }: React.ComponentPropsWithRef<ButtonProps>) => (
  <div className="flex flex-col items-start space-y-2">
    <Button {...args}>{args.iconButton ? <Icon icon={<CandyCane />} /> : children}</Button>
    <Button {...args} leftIcon={<Icon icon={<CandyCane />} />}>
      {args.iconButton ? '' : children}
    </Button>
  </div>
);

Template.storyName = 'Button';

type Story = StoryObj<typeof Button>;

export const ClickTest: Story = {
  name: 'Test: Click',
  tags: ['dev-only', '!autodocs'],
  args: {
    children: 'Click me',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Click me' });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const DisabledTest: Story = {
  name: 'Test: Disabled',
  tags: ['dev-only', '!autodocs'],
  args: {
    children: 'Disabled button',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Disabled button' });

    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const LoadingTest: Story = {
  name: 'Test: Loading',
  tags: ['dev-only', '!autodocs'],
  args: {
    children: 'Loading',
    loading: true,
    loadingText: 'Loading...',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const VariantsTest: Story = {
  name: 'Test: Variants',
  tags: ['dev-only', '!autodocs'],
  render: () => (
    <div className="flex gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Tertiary' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Link' })).toBeInTheDocument();
  },
};
