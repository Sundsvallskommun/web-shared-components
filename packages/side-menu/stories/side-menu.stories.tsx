import React, { useEffect } from 'react';
import { useState } from 'react';
import { Meta } from '@storybook/react';
import { IDataObject, IMenuProps, SideMenu, IMenu } from '../src/side-menu';
import testData from './testData.json';
import testDataNoPath from './testDataNoPath.json';
import testDataNoPathDraggable from './testDataNoPathDraggable.json';
import { Select } from '@sk-web-gui/forms';

export default {
  title: 'Komponenter/Sidebar',
  component: SideMenu,
  tags: ['autodocs'],
  args: {
    label: 'Sidomeny',
    menuData: testDataNoPath,
  },
} as Meta<typeof SideMenu>;

export const Template = ({ ...args }: IMenuProps) => {
  const [activeId, setActiveId] = useState<number | string>(1280);

  const goDeepHandler = () => {
    setActiveId(1277);
  };

  const goShallowHandler = () => {
    setActiveId(1295);
  };

  const linkCallbackHandler = (data: IDataObject) => {
    setActiveId(data.id);

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
        activeId={activeId}
        labelCallback={() => console.log('labelCallback')}
        onDrop={handleOnDrop}
      />
    </div>
  );
};

Template.storyName = 'SideMenu';

export const TemplateHeadElement = ({ ...args }: IMenuProps) => {
  const [activeId, setActiveId] = useState<number>(1280);

  const goDeepHandler = () => {
    setActiveId(1277);
  };

  const goShallowHandler = () => {
    setActiveId(1295);
  };

  const linkCallbackHandler = (data: IDataObject) => {
    setActiveId(parseInt(data.id.toString()));

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
        menuData={testData}
        linkCallback={linkCallbackHandler}
        activeId={activeId}
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

export const TemplateLoadingBlock = ({ ...args }: IMenuProps) => {
  const [activeId, setActiveId] = useState<number>(1280);
  const linkCallbackHandler = (data: IDataObject) => {
    setActiveId(parseInt(data.id.toString()));
    console.log('link click', data);
  };
  return (
    <div>
      <SideMenu
        {...args}
        label="Menu label (254)"
        menuData={testData}
        linkCallback={linkCallbackHandler}
        loading={true}
        activeId={activeId}
      />
    </div>
  );
};
TemplateLoadingBlock.storyName = 'SideMenu with loading block';

export const TemplateDraggable = ({ ...args }: IMenuProps) => {
  const [activeId, setActiveId] = useState<number | null>(1280);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const linkCallbackHandler = (data: IDataObject) => {
    setActiveId(parseInt(data.id.toString()));
    console.log('link click', data);
  };
  const handleOnDrop = (draggedItem: IMenu, oldParent: IMenu, newParent: IMenu) => {
    console.log('handleOnDrop', draggedItem, oldParent, newParent);
  };

  useEffect(() => {
    setTimeout(() => {
      setMenuData(testDataNoPathDraggable as any);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="pb-xl">
      <button
        className="bg-black rounded-xl text-white m-10 p-10"
        onClick={() => {
          setActiveId(null);
        }}
      >
        Set null
      </button>
      <SideMenu
        {...args}
        loading={loading}
        label="Menu label (254)"
        menuData={menuData}
        linkCallback={linkCallbackHandler}
        activeId={activeId}
        className="ml-[100px]"
        draggable
        onDrop={handleOnDrop}
      />
    </div>
  );
};
TemplateDraggable.storyName = 'SideMenu that is draggable';
