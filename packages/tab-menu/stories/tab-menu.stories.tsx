import * as React from 'react';
import { TabMenu } from '../src/tab-menu';
import { useState } from 'react'
export default {
  title: 'Komponenter/Meny/TabMenu',
  component: TabMenu,
  parameters: {},
};

const menuData = [
  {
    id: 1,
    element: () => <a href="#">Menu 1</a>
  },
  {
    id: 2,
    element: () => <a href="#">Menu 2</a>
  },
  {
    id: 3,
    element: () => <a href="#">Menu 3</a>
  }
]

export const Template = (args: any) => {
  const [active, setActive] = useState<string | number>(2)

  return (
    <TabMenu {...args} menuData={menuData} active={active} onChange={setActive}/>
  );
}

Template.argTypes = {

};

Template.storyName = 'TabMenu';
