import React from 'react';
import { Meta } from '@storybook/react';
import { MenuBar, MenuBarProps } from '../src';
import { Button } from '@sk-web-gui/button';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import { Icon } from '@sk-web-gui/icon';

export default {
  title: 'Komponenter/Menu-horizontal',
  component: MenuBar,
  tags: ['autodocs'],
  args: {
    separator: '/',
  },
} as Meta<typeof MenuBar>;

export const Template = (args: MenuBarProps) => {
  const [current, setCurrent] = React.useState<number | undefined>(1);
  return (
    <div className="h-[50rem]">
      <MenuBar {...args} current={current}>
        <MenuBar.Item>
          <button onClick={() => setCurrent(0)}>Ett menyval</button>
        </MenuBar.Item>
        <MenuBar.Item>
          <Button onClick={() => setCurrent(1)}>Menyval 2</Button>
        </MenuBar.Item>
        <MenuBar.Item>
          <a href="#">Menyval 3</a>
        </MenuBar.Item>
        <MenuBar.Item>
          <PopupMenu>
            <PopupMenu.Button rightIcon={<Icon name="chevron-down" />}>Flervals</PopupMenu.Button>
            <PopupMenu.Item>
              <button onClick={() => setCurrent(2)}>Underval 1</button>
            </PopupMenu.Item>
            <PopupMenu.Item>
              <a onClick={() => setCurrent(2)}>Underval 2</a>
            </PopupMenu.Item>
          </PopupMenu>
        </MenuBar.Item>
      </MenuBar>
    </div>
  );
};

Template.storyName = 'MenuBar';
