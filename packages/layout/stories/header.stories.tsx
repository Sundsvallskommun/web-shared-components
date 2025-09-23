import React from 'react';
import { Button } from '@sk-web-gui/button';
import { NavigationBar } from '@sk-web-gui/navigationbar';
import { Icon } from '@sk-web-gui/icon';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import { UserMenu, MenuItemGroup } from '@sk-web-gui/user-menu';
import { Meta, StoryObj } from '@storybook/react';
import { Link } from '@sk-web-gui/link';
import { Header, HeaderProps } from '../src';
import { User, Wallet, Settings2, LogOut, Menu, ChevronDown } from 'lucide-react';

export default {
  title: 'Layout/Header',
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
            <Icon icon={<User />} />
            Profil
          </Link>
        ),
      },
      {
        label: 'Konto',
        element: () => (
          <Link href="/beslutade">
            <Icon icon={<Wallet />} />
            Konto
          </Link>
        ),
      },
      {
        label: 'Inställningar',
        element: () => (
          <Link href="/handlingsplan">
            <Icon icon={<Settings2 />} />
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
            <Icon icon={<LogOut />} />
            Logga ut
          </Link>
        ),
      },
    ],
  },
];

export const Template: StoryObj<typeof Header> = (args: React.ComponentPropsWithRef<HeaderProps['Component']>) => {
  return (
    <div className="h-[40rem] overflow-hidden">
      <Header
        {...args}
        title={args.title}
        subtitle={args.subtitle}
        logo={args.logo}
        userMenu={<UserMenu menuGroups={menuGroups} />}
        mobileMenu={
          <Button iconButton>
            <Icon icon={<Menu />} />
          </Button>
        }
        mainMenu={
          <NavigationBar color="vattjom">
            <NavigationBar.Item>
              <button>E-tjänster</button>
            </NavigationBar.Item>
            <NavigationBar.Item current>
              <Button>Mina sidor</Button>
            </NavigationBar.Item>
            <NavigationBar.Item>
              <PopupMenu>
                <PopupMenu.Button rightIcon={<Icon icon={<ChevronDown />} />}>Hjälp</PopupMenu.Button>
                <PopupMenu.Panel>
                  <PopupMenu.Items>
                    <PopupMenu.Item>
                      <button>Underval 1</button>
                    </PopupMenu.Item>
                    <PopupMenu.Item>
                      <a>Underval 2</a>
                    </PopupMenu.Item>
                  </PopupMenu.Items>
                </PopupMenu.Panel>
              </PopupMenu>
            </NavigationBar.Item>
          </NavigationBar>
        }
      />
    </div>
  );
};

Template.storyName = 'Header';
