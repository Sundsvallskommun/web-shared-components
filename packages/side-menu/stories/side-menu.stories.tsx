import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { IDataObject, SideMenu } from '../src/side-menu';
import testData from './testData.json';
import testDataNoPath from './testDataNoPath.json';
import testDataNoPathDraggable from './testDataNoPathDraggable.json';
import { Select } from '@sk-web-gui/forms';
import { Spinner } from '@sk-web-gui/spinner';

export default {
  title: 'Komponenter/Meny/SideMenu',
  component: SideMenu,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = ({ ...args }: any) => {
  const [active, setActive] = useState<number>(1280);

  const goDeepHandler = () => {
    setActive(1277);
  };

  const goShallowHandler = () => {
    setActive(1295);
  };

  const linkCallbackHandler = (data: any) => {
    setActive(data.id);

    console.log('link click', data);
  };

  return (
    <div>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={goDeepHandler}>
        Active Shallow
      </button>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={goShallowHandler}>
        Active Deep
      </button>

      <SideMenu
        {...args}
        linkCallback={linkCallbackHandler}
        active={active}
        labelCallback={() => console.log('labelCallback')}
        draggable
        className="ml-[100px]"
      />
    </div>
  );
};

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
      required: true,
    },
    description: 'Data for menu',
    defaultValue: testDataNoPathDraggable,
  },
  label: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Name of menu',
    defaultValue: 'Menu label (254)',
  },
  closeNoneActive: {
    type: {
      name: 'boolean',
      required: false,
    },
    description: 'Close non active menuitems when active id changes',
    defaultValue: true,
  },
};

export const TemplateHeadElement = ({ ...args }: any) => {
  const [active, setActive] = useState<number | string>();

  const goDeepHandler = () => {
    setActive(1277);
  };

  const goShallowHandler = () => {
    setActive(1295);
  };

  const linkCallbackHandler = (data: IDataObject) => {
    setActive(data.id);

    console.log('link click', data);
  };

  const selectChangeHandler = () => {
    // void
  };

  return (
    <div>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={goDeepHandler}>
        Active Shallow
      </button>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={goShallowHandler}>
        Active Deep
      </button>

      <SideMenu
        {...args}
        linkCallback={linkCallbackHandler}
        active={active}
        headElement={
          <div className="mb-[20px]">
            <label className="label-small">Select in head</label>
            <Select className="mt-[6px]" onChange={selectChangeHandler}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Select>
          </div>
        }
      />
    </div>
  );
};

TemplateHeadElement.storyName = 'SideMenu With headElement';

TemplateHeadElement.argTypes = {
  menuData: {
    type: {
      name: 'array',
      required: true,
    },
    description: 'Data for menu',
    defaultValue: testData,
  },
  label: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Name of menu',
    defaultValue: 'Menu label (254)',
  },
};

export const TemplateLoadingBlock = ({ ...args }: any) => {
  const [active, setActive] = useState<number>();
  const linkCallbackHandler = (data: any) => {
    setActive(data.id);
    console.log('link click', data);
  };
  return (
    <div>
      <SideMenu {...args} linkCallback={linkCallbackHandler} loading={true} active={active} />
    </div>
  );
};
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
      required: true,
    },
    description: 'Data for menu',
    defaultValue: testDataNoPath,
  },
  label: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Name of menu',
    defaultValue: 'Menu label (254)',
  },
};

export const TemplateDraggable = ({ ...args }: any) => {
  const [active, setActive] = useState<number>(1280);
  const linkCallbackHandler = (data: any) => {
    setActive(data.id);
    console.log('link click', data);
  };
  return (
    <div>
      <SideMenu {...args} linkCallback={linkCallbackHandler} active={active} draggable className="ml-[100px]" />
    </div>
  );
};
TemplateDraggable.storyName = 'SideMenu that is draggable';
TemplateDraggable.argTypes = {
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
      required: true,
    },
    description: 'Data for menu',
    defaultValue: testDataNoPathDraggable,
  },
  label: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Name of menu',
    defaultValue: 'Menu label (254)',
  },
};
