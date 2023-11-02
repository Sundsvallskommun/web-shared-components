import { Button, MenuBar, PopupMenu } from '@sk-web-gui/react';
import { Meta, StoryObj } from '@storybook/react';
import { Menu, User, ChevronDown } from 'lucide-react';
import { Header, HeaderProps } from '../src';

export default {
  title: 'Komponenter/Header/Komponent',
  component: Header,
  tags: ['autodocs'],
} as Meta<typeof Header>;

export const Template: StoryObj<typeof Header> = (args: HeaderProps) => {
  return (
    <div className="h-[40rem] overflow-hidden">
      <Header
        {...args}
        className=" !max-w-[156rem]"
        title="E-tjänster"
        subtitle="Sundsvalls kommun"
        userMenu={
          <Button variant="tertiary" leftIcon={<User />}>
            Logga in
          </Button>
        }
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
