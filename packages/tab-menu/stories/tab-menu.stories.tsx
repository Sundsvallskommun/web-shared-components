import { Meta } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';
import { TabMenu, TabMenuProps } from '../src/tab-menu';
import { IMenuItem } from '../src/tab-item';

const menuData = [
  {
    id: 1,
    label: 'Målbild och strategi',
    path: '/path/1',
  },
  {
    id: 2,
    label: 'Inlägg',
    path: '/path/2',
  },
  {
    id: 3,
    label: 'Exempel från vardagen',
    path: '/path/3',
  },
  {
    id: 3,
    label: 'Riktlinjer, modeller och metoder',
    path: '/path/4',
  },
];

export default {
  title: 'Komponenter/Meny/TabMenu',
  component: TabMenu,
  tags: ['autodocs'],
  parameters: { controls: { hideNoControlsWarning: true } },
  args: {
    menuData: menuData,
  },
} as Meta;

export const Template = (args: any) => {
  const [active, setActive] = useState<string>('/path/1');

  const onTabChangeHandler = (item: IMenuItem) => {
    console.log('MenuItem: ', item);

    setActive(item.path);
  };

  const onClickHandler = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
  };

  return <TabMenu {...args} active={active} onTabChange={onTabChangeHandler} onTabClick={onClickHandler} />;
};

export const TemplateWithChildren = (args: TabMenuProps) => {
  const [active, setActive] = useState<string>('/path/1');

  const onTabChangeHandler = (item: IMenuItem) => {
    console.log('MenuItem: ', item);

    setActive(item.path);
  };

  const onClickHandler = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
  };

  return (
    <TabMenu {...args} active={active} onTabChange={onTabChangeHandler} onTabClick={onClickHandler}>
      <p style={{ marginLeft: 'auto', padding: '10px', borderRadius: '10px', border: '1px solid grey' }}>
        Child component
      </p>
    </TabMenu>
  );
};

const argTypes = {
  menuData: {
    type: {
      name: 'array',
      required: true,
    },
    description: 'this is the data of tab menu',
    defaultValue: menuData,
  },
  active: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Sets active path (defaults to location.pathname)',
    defaultValue: '',
  },
  className: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Classses for menu wrapper',
    defaultValue: '',
  },
  itemClassName: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Classses each item',
    defaultValue: '',
  },
};

Template.argTypes = argTypes;

TemplateWithChildren.argTypes = argTypes;

Template.storyName = 'TabMenu';
TemplateWithChildren.storyName = 'TabMenu with children';
