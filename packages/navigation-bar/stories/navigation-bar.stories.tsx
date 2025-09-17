import React from 'react';
import { Meta } from '@storybook/react';
import { NavigationBar, NavigationBarProps } from '../src';
import { Button } from '@sk-web-gui/button';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import { Icon } from '@sk-web-gui/icon';
import { ChevronDown } from 'lucide-react';

export default {
  title: 'Komponenter/Menu-horizontal',
  component: NavigationBar,
  tags: ['autodocs'],
} as Meta<typeof NavigationBar>;

export const Template = (args: NavigationBarProps) => {
  const [current, setCurrent] = React.useState<number | undefined>(0);
  return (
    <div className="h-[50rem]">
      <NavigationBar {...args} current={current}>
        <NavigationBar.Item>
          <button onClick={() => setCurrent(0)}>Ett menyval</button>
        </NavigationBar.Item>
        <NavigationBar.Item>
          <Button onClick={() => setCurrent(1)}>Menyval 2</Button>
        </NavigationBar.Item>
        <NavigationBar.Item>
          <a href="#">Menyval 3</a>
        </NavigationBar.Item>
        <NavigationBar.Item>
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
        </NavigationBar.Item>
      </NavigationBar>
    </div>
  );
};

Template.storyName = 'NavigationBar';
