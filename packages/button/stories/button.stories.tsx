import { Meta } from '@storybook/react';
import { Button, ButtonProps } from '../src';
import { Icon } from '@sk-web-gui/icon';

export default {
  title: 'Komponenter/Knappar/Komponent',
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

export const Template = ({ children, ...args }: ButtonProps) => (
  <div className="flex flex-col items-start space-y-2">
    <Button {...args}>{args.iconButton ? <Icon name="candy-cane" /> : children}</Button>
    <Button {...args} leftIcon={<Icon name="candy-cane" />}>
      {args.iconButton ? '' : children}
    </Button>
  </div>
);

Template.storyName = 'Button';

// export const Grupp = () => (
//   <div className="space-y-4">
//     <div>
//       <Button.Group variant="solid" color="primary" className="space-x-2">
//         <Button>Button</Button>
//         <Button>Button</Button>
//         <Button>Button</Button>
//         <Button>Button</Button>
//       </Button.Group>
//     </div>

//     <div>
//       <Button.Group variant="solid" color="orange" className="space-x-2">
//         <Button>Button</Button>
//         <Button>Button</Button>
//         <Button>Button</Button>
//         <Button>Button</Button>
//       </Button.Group>
//     </div>

//     <div>
//       <Button.Group variant="solid" color="primary" className="space-x-2">
//         <Button iconButton>
//           <Announcement size={16} />
//         </Button>

//         <Button iconButton>
//           <Announcement size={16} />
//         </Button>

//         <Button iconButton>
//           <Announcement size={16} />
//         </Button>

//         <Button iconButton>
//           <Announcement size={16} />
//         </Button>
//       </Button.Group>
//     </div>
//   </div>
// );

// export const Fastsittandes = () => (
//   <div className="space-y-4">
//     <div>
//       <Button.Group variant="primary" attached>
//         <Button>Button</Button>
//         <Button>Button</Button>
//         <Button>Button</Button>
//         <Button>Button</Button>
//       </Button.Group>
//     </div>

//     <div>
//       <Button.Group variant="primary" size="lg" attached>
//         <Button>Button</Button>
//         <Button>Button</Button>
//         <Button>Button</Button>
//         <Button>Button</Button>
//       </Button.Group>
//     </div>

//     <div>
//       <Button.Group variant="primary" color="primary" attached>
//         <Button>Button</Button>
//         <Button>Button</Button>
//         <Button>Button</Button>
//         <Button>Button</Button>
//       </Button.Group>
//     </div>

//     <div>
//       <Button.Group variant="primary" attached>
//         <Button>Button</Button>
//         <Button color="primary">Button</Button>
//         <Button>Button</Button>
//       </Button.Group>
//     </div>

//     <div>
//       <Button.Group variant="primary" attached>
//         <Button iconButton>
//           <Announcement size={16} />
//         </Button>

//         <Button iconButton>
//           <Announcement size={16} />
//         </Button>

//         <Button iconButton>
//           <Announcement size={16} />
//         </Button>

//         <Button iconButton>
//           <Announcement size={16} />
//         </Button>
//       </Button.Group>
//     </div>

//     <div>
//       <Button.Group variant="primary" attached>
//         <Button iconButton>
//           <Announcement size={32} />
//         </Button>

//         <Button iconButton>
//           <Announcement size={32} />
//         </Button>

//         <Button iconButton>
//           <Announcement size={32} />
//         </Button>

//         <Button iconButton>
//           <Announcement size={32} />
//         </Button>
//       </Button.Group>
//     </div>
//   </div>
// );
