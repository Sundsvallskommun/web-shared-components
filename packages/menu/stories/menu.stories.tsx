import React from 'react';
import { Meta } from '@storybook/react';
import { Menu } from "../src/menu";
import { Link } from '@sk-web-gui/link';

export default {
  title: "Komponenter/Meny/Menu",
  component: Menu,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

const menuData = [
  {
    id: 1,
    element: (
      <Link href="#">
        Menu
      </Link>
    ),
    subMenu: [{
        id: 11,
        element: (
          <button>
            Menu button
          </button>
        ),
        subMenu: null,
      },
      {
        id: 12,
        element: (
          <Link href="#">
            Menu
          </Link>
        ),
        subMenu: [
          {
            id: 21,
            element: (
              <Link href="#">
                Very long menu text, to test how dual row menus would look
              </Link>
            ),
            subMenu: [
              {
                id: 31,
                element: (
                  <Link href="#">
                    Menu
                  </Link>
                ),
                subMenu: null,
              },
              {
                id: 32,
                element: (
                  <Link href="#">
                    Menu
                  </Link>
                ),
                subMenu: null,
              },
              {
                id: 33,
                element: (
                  <Link href="#">
                    Menu
                  </Link>
                ),
                subMenu: [
                {
                  id: 41,
                  element: (
                    <Link href="#">
                      Menu
                    </Link>
                  ),
                  subMenu: [
                    {
                    id: 51,
                    element: (
                      <Link href="#">
                        Menu
                      </Link>
                    ),
                    subMenu: [
                      {
                        id: 61,
                        element: (
                          <Link href="#">
                            Menu
                          </Link>
                        ),
                        subMenu: null
                      }
                    ]
                  }]
                },
                {
                  id: 42,
                  element: (
                    <Link href="#">
                      Menu
                    </Link>
                  ),
                  subMenu: null,
                },
                {
                  id: 43,
                  element: (
                    <Link href="#">
                      Menu
                    </Link>
                  ),
                  subMenu: null,
                }

              ]
            }]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    element: (
      <Link href="#">
        Menu
      </Link>
    ),
    subMenu: null,
  },
  {
    id: 3,
    element: (
      <Link href="#">
        Menu
      </Link>
    ),
    subMenu: null,
  }
]


const selectMenuData = [
  {
    id: 1,
    label: 'Menu 1',
    value: 'menuOne'
  },
  {
    id: 2,
    label: 'Menu 2',
    value: 'menuTwo'
  }
]

export const Template = ({ ...args }: any) => 
    <Menu {...args}/>



Template.storyName = 'Menu';

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
    defaultValue: menuData
  },
  label: {
    type: { 
      name: 'string',
      required: false
    },
    description: 'Name of menu',
    defaultValue: 'Menu label (254)'
  },
  selectMenuData: {
    type: { 
      name: 'array',
      required: false
    },
    description: 'Selector for menu',
    defaultValue: selectMenuData
  },
  selectedMenu: {
    type: { 
      name: 'array',
      required: false
    },
    description: 'Selector for menu',
    defaultValue: 'Menu 1'
  },
};