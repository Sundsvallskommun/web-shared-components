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
    label: 'label 1',
    path: '/path/1'
  },
  {
    id: 2,
    label: 'label 2',
    path: '/path/2'
  },
  {
    id: 3,
    label: 'label 3',
    path: '/path/3'
  }
]

export const Template = (args: any) => {
  const [active, setActive] = useState<string>("/path/1")

  const onTabChangeHandler = (path, id) => {
    console.log("Path", path, "Id", id)

    setActive(path)
  }

  return (
    <TabMenu 
      {...args} 
      active={active}
      onTabChange={onTabChangeHandler}
    />
  );
}

export const TemplateWithChildren = (args: any) => {
  const [active, setActive] = useState<string>("/path/1")

  const onTabChangeHandler = (path, id) => {
    console.log("Path", path, "Id", id)

    setActive(path)
  }

  return (
    <TabMenu 
      {...args} 
      active={active}
      onTabChange={onTabChangeHandler}
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
