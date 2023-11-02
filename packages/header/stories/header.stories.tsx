import { Button, MenuBar, MenuItemGroup, PopupMenu, UserMenu } from '@sk-web-gui/react';
import { Meta, StoryObj } from '@storybook/react';
import { ChevronDown, LogOut, Menu, Settings2, User, Wallet } from 'lucide-react';
import { Link } from '../../react';
import { Header, HeaderProps } from '../src';

export default {
  title: 'Komponenter/Header/Komponent',
  component: Header,
  tags: ['autodocs'],
} as Meta<typeof Header>;

const menuGroups: MenuItemGroup[] = [
  {
    label: 'Main',
    elements: [
      {
        label: 'Min profil',
        element: () => (
          <Link href="/pagaende">
            <User />
            Profil
          </Link>
        ),
      },
      {
        label: 'Konto',
        element: () => (
          <Link href="/beslutade">
            <Wallet />
            Konto
          </Link>
        ),
      },
      {
        label: 'Inställningar',
        element: () => (
          <Link href="/handlingsplan">
            <Settings2 />
            Inställningar
          </Link>
        ),
      },
    ],
  },
  {
    label: 'Logga ut',
    elements: [
      {
        label: 'Logga ut',
        element: () => (
          <Link href="/logout">
            <LogOut />
            Logga ut
          </Link>
        ),
      },
    ],
  },
];

export const Template: StoryObj<typeof Header> = (args: HeaderProps) => {
  return (
    <div className="h-[40rem] overflow-hidden">
      <Header
        {...args}
        title="E-tjänster"
        subtitle="Sundsvalls kommun"
        userMenu={<UserMenu menuGroups={menuGroups} />}
        mobileMenu={
          <Button iconButton>
            <Menu />
          </Button>
        }
        mainMenu={
          <MenuBar color="vattjom">
            <MenuBar.Item>
              <button>E-tjänster</button>
            </MenuBar.Item>
            <MenuBar.Item current>
              <Button>Mina sidor</Button>
            </MenuBar.Item>
            <MenuBar.Item>
              <PopupMenu>
                <PopupMenu.Button rightIcon={<ChevronDown />}>Hjälp</PopupMenu.Button>
                <PopupMenu.Item>
                  <button>Underval 1</button>
                </PopupMenu.Item>
                <PopupMenu.Item>
                  <a>Underval 2</a>
                </PopupMenu.Item>
              </PopupMenu>
            </MenuBar.Item>
          </MenuBar>
        }
      ></Header>
    </div>
  );
};

Template.storyName = 'Header';
