import React from 'react';
import { Button } from '@sk-web-gui/button';
import { MenuBar } from '@sk-web-gui/menubar';
import { Icon } from '@sk-web-gui/icon';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import { UserMenu, MenuItemGroup } from '@sk-web-gui/user-menu';
import { Meta, StoryObj } from '@storybook/react';
import { Link } from '@sk-web-gui/link';
import { Header, HeaderProps } from '../src';

export default {
  title: 'Komponenter/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    title: 'E-tjänster',
    subtitle: 'Sundsvalls kommun',
  },
} as Meta<typeof Header>;

const menuGroups: MenuItemGroup[] = [
  {
    label: 'Main',
    elements: [
      {
        label: 'Min profil',
        element: () => (
          <Link href="/pagaende">
            <Icon name="user" />
            Profil
          </Link>
        ),
      },
      {
        label: 'Konto',
        element: () => (
          <Link href="/beslutade">
            <Icon name="wallet" />
            Konto
          </Link>
        ),
      },
      {
        label: 'Inställningar',
        element: () => (
          <Link href="/handlingsplan">
            <Icon name="settings-2" />
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
            <Icon name="log-out" />
            Logga ut
          </Link>
        ),
      },
    ],
  },
];

export const Template: StoryObj<typeof Header> = (args: React.ComponentProps<HeaderProps['Component']>) => {
  return (
    <div className="h-[40rem] overflow-hidden">
      <Header
        {...args}
        title={args.title}
        subtitle={args.subtitle}
        userMenu={<UserMenu menuGroups={menuGroups} />}
        mobileMenu={
          <Button iconButton>
            <Icon name="menu" />
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
                <PopupMenu.Button rightIcon={<Icon name="chevron-down" />}>Hjälp</PopupMenu.Button>
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
