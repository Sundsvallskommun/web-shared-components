import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { IDataObject, SideMenu } from "../src/side-menu";
import testData from './testData.json'
import { Select } from '@sk-web-gui/forms';
import { Spinner } from '@sk-web-gui/spinner';


export default {
  title: "Komponenter/Meny/SideMenu",
  component: SideMenu,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = ({ ...args }: any) => {
  const [active, setActive] = useState<number>()

  const goDeepHandler = () => {
    setActive(1277)
  }
  
  const goShallowHandler = () => {
    setActive(1295)
  }

  const linkCallbackHandler = (data: any) => {
    setActive(data.id)

    console.log("link click", data)
  }
  

  return (
    <div>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={goDeepHandler}>Active Shallow</button>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={goShallowHandler}>Active Deep</button>
    
      <SideMenu {...args} linkCallback={linkCallbackHandler} active={active} />
    </div>
  )
}




Template.storyName = 'SideMenu';

Template.argTypes = {
  disabled: {
    type: { name: 'string', required: false },
    description: 'Sets disabled',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  menuData: {
    type: { 
      name: 'array',
      required: true
    },
    description: 'Data for menu',
    defaultValue: testData
  },
  label: {
    type: { 
      name: 'string',
      required: false
    },
    description: 'Name of menu',
    defaultValue: 'Menu label (254)'
  }
};


export const TemplateHeadElement = ({ ...args }: any) => {
  const [active, setActive] = useState<number | string>()
  
  const goDeepHandler = () => {
    setActive(1277)
  }
  
  const goShallowHandler = () => {
    setActive(1295)
  }

  const linkCallbackHandler = (data: IDataObject) => {
    setActive(data.id)

    console.log("link click", data)
  }
  
  const selectChangeHandler = () => {
    // void
  }


  return (
    <div>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={goDeepHandler}>Active Shallow</button>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={goShallowHandler}>Active Deep</button>
    
      <SideMenu {...args} linkCallback={linkCallbackHandler} active={active} headElement={
        <div>
          <label>Select in head</label>
          <Select onChange={selectChangeHandler}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Select>
        </div>
      }/>
    </div>
  )
}

TemplateHeadElement.storyName = 'SideMenu With headElement';

TemplateHeadElement.argTypes = {
  menuData: {
    type: { 
      name: 'array',
      required: true
    },
    description: 'Data for menu',
    defaultValue: testData
  },
  label: {
    type: { 
      name: 'string',
      required: false
    },
    description: 'Name of menu',
    defaultValue: 'Menu label (254)'
  }
};

export const TemplateLoadingBlock = ({ ...args }: any) => {
  const [active, setActive] = useState<number>()
  const linkCallbackHandler = (data: any) => {
    setActive(data.id)
    console.log("link click", data)
  }
  return (
    <div>
      <SideMenu {...args} linkCallback={linkCallbackHandler} loading={true} active={active}/>
    </div>
  )
}
TemplateLoadingBlock.storyName = 'SideMenu with loading block';
TemplateLoadingBlock.argTypes = {
  disabled: {
    type: { name: 'string', required: false },
    description: 'Sets disabled',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  menuData: {
    type: {
      name: 'array',
      required: true
    },
    description: 'Data for menu',
    defaultValue: testData
  },
  label: {
    type: {
      name: 'string',
      required: false
    },
    description: 'Name of menu',
    defaultValue: 'Menu label (254)'
  }
};