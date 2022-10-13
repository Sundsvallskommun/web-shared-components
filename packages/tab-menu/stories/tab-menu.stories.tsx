import * as React from 'react';
import { TabMenu } from '../src/tab-menu';
import { useState } from 'react';

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
    <TabMenu 
    {...args} 
    active={active}
    onChange={setActive}
    />
  );
}

export const TemplateWithChildren = (args: any) => {

  const [active, setActive] = useState<string | number>(2)

  return (
    <TabMenu 
    {...args} 
    active={active}
    onChange={setActive}
    >
     <p style={{marginLeft:"auto", padding:"10px", borderRadius:"10px", border:"1px solid grey"}}>Child component</p>
    </TabMenu>
  );
}


Template.argTypes = {
  menuData:{
    type:{
      name:"array",
      required:true,
    },
    description:"this is the data of tab menu",
    defaultValue:menuData,
  },

};
TemplateWithChildren.argTypes = {
  menuData:{
    type:{
      name:"array",
      required:true,
    },
    description:"this is the data of tab menu",
    defaultValue:menuData,
  },

};

Template.storyName = 'TabMenu';
TemplateWithChildren.storyName = 'TabMenu with children';
