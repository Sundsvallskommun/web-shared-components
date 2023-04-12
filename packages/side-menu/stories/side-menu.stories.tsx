import React from 'react';
import { useState } from 'react';
import { Meta } from '@storybook/react';
import { IDataObject, IMenuProps, SideMenu } from '../src/side-menu';
import testData from './testData.json';
import testDataNoPath from './testDataNoPath.json';
import testDataNoPathDraggable from './testDataNoPathDraggable.json';
import { Select } from '@sk-web-gui/forms';
import { IMenu } from '@sk-web-gui/react';

export default {
  title: 'Komponenter/Meny/Sidomeny',
  component: SideMenu,
  tags: ['autodocs'],
  args: {
    label: 'Sidomeny',
    menuData: testDataNoPath,
  },
} as Meta;

export const Template = ({ ...args }: IMenuProps) => {
  const [active, setActive] = useState<number | string>(1280);

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

  const handleOnDrop = (draggedItem: IMenu, oldParent: IMenu, newParent: IMenu) => {
    console.log('handleOnDrop', draggedItem, oldParent, newParent);
  };

  return (
    <div className="pb-xl">
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
        onDrop={handleOnDrop}
      />
    </div>
  );
};

Template.storyName = 'SideMenu';

export const TemplateHeadElement = () => {
  const [active, setActive] = useState<number>(1280);

  const goDeepHandler = () => {
    setActive(1277);
  };

  const goShallowHandler = () => {
    setActive(1295);
  };

  const linkCallbackHandler = (data: IDataObject) => {
    setActive(parseInt(data.id.toString()));

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
        menuData={testData}
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

export const TemplateLoadingBlock = () => {
  const [active, setActive] = useState<number>(1280);
  const linkCallbackHandler = (data: IDataObject) => {
    setActive(parseInt(data.id.toString()));
    console.log('link click', data);
  };
  return (
    <div>
      <SideMenu
        label="Menu label (254)"
        menuData={testData}
        linkCallback={linkCallbackHandler}
        loading={true}
        active={active}
      />
    </div>
  );
};
TemplateLoadingBlock.storyName = 'SideMenu with loading block';

export const TemplateDraggable = () => {
  const [active, setActive] = useState<number>(1280);
  const linkCallbackHandler = (data: IDataObject) => {
    setActive(parseInt(data.id.toString()));
    console.log('link click', data);
  };
  const handleOnDrop = (draggedItem: IMenu, oldParent: IMenu, newParent: IMenu) => {
    console.log('handleOnDrop', draggedItem, oldParent, newParent);
  };
  return (
    <div className="pb-xl">
      <SideMenu
        label="Menu label (254)"
        menuData={testDataNoPathDraggable}
        linkCallback={linkCallbackHandler}
        active={active}
        className="ml-[100px]"
        draggable
        onDrop={handleOnDrop}
      />
    </div>
  );
};
TemplateDraggable.storyName = 'SideMenu that is draggable';
