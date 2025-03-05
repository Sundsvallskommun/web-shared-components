import React from 'react';
import { Meta } from '@storybook/react';
import { MenuBar, MenuBarProps } from '../src';
import { Button } from '@sk-web-gui/button';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import { Icon } from '@sk-web-gui/icon';
import { ChevronDown } from 'lucide-react';

export default {
  title: 'Komponenter/Menu-horizontal',
  component: MenuBar,
  tags: ['autodocs'],
} as Meta<typeof MenuBar>;

export const Template = (args: MenuBarProps) => {
  const [current, setCurrent] = React.useState<number | undefined>(0);
  return (
    <div className="h-[50rem]">
      <MenuBar {...args} current={current}>
        <MenuBar.Item>
          <Button onClick={() => setCurrent(0)}>Ett menyval</Button>
        </MenuBar.Item>
        <MenuBar.Item>
          <Button onClick={() => setCurrent(1)}>Menyval 2</Button>
        </MenuBar.Item>
        <MenuBar.Item>
          <a href="#">Menyval 3</a>
        </MenuBar.Item>
        <MenuBar.Item>
          <PopupMenu>
            <PopupMenu.Button rightIcon={<Icon icon={<ChevronDown />} />}>Flervals</PopupMenu.Button>
            <PopupMenu.Panel>
              <PopupMenu.Items>
                <PopupMenu.Item>
                  <button onClick={() => setCurrent(2)}>Underval 1</button>
                </PopupMenu.Item>
                <PopupMenu.Item>
                  <a onClick={() => setCurrent(2)}>Underval 2</a>
                </PopupMenu.Item>
              </PopupMenu.Items>
            </PopupMenu.Panel>
          </PopupMenu>
        </MenuBar.Item>
      </MenuBar>
    </div>
  );
};

Template.storyName = 'MenuBar';
