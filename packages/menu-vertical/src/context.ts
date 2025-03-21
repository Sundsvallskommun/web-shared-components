import React from 'react';
import { Menu, MenuIndex } from './types';

export interface UseMenuVerticalPropsStates {
  rootId: string;
  rootMenuId: string;
  menu: Menu;
  active: MenuIndex;
  focused: MenuIndex;
  activeMenuId: string;
  current: MenuIndex;
  currentMenuId: string;
  menuAriaLabel?: string;
}

export interface UseMenuVerticalPropsFunctions {
  setMenu: React.Dispatch<React.SetStateAction<Menu>>;
  setActive: React.Dispatch<React.SetStateAction<UseMenuVerticalPropsStates['active']>>;
  setActiveMenuId: React.Dispatch<React.SetStateAction<UseMenuVerticalPropsStates['activeMenuId']>>;
  setCurrent: React.Dispatch<React.SetStateAction<UseMenuVerticalPropsStates['current']>>;
  setFocused: React.Dispatch<React.SetStateAction<UseMenuVerticalPropsStates['focused']>>;
  setCurrentMenuId: React.Dispatch<React.SetStateAction<UseMenuVerticalPropsStates['currentMenuId']>>;
  next: () => void;
  prev: () => void;
  getAboveSubmenuIds: (menuId: string, menuIds?: string[]) => string[];
  setSubmenus: (defaultOpen?: boolean, options?: { openMenuIds?: string[]; closeMenuIds?: string[] }) => void;
  setCurrentActive: (menuIndex: UseMenuVerticalPropsStates['current']) => void;
  setCurrentActiveFocus: (menuIndex: UseMenuVerticalPropsStates['focused']) => void;
  setActiveFocus: (menuIndex: UseMenuVerticalPropsStates['focused']) => void;
}

export type UseMenuVerticalProps = UseMenuVerticalPropsStates & UseMenuVerticalPropsFunctions;

const defaults = {
  rootId: '',
  rootMenuId: '',

  menu: {},
  setMenu: () => ({}),

  active: '',
  setActive: () => ({}),

  focused: '',
  setFocused: () => ({}),

  current: '',
  setCurrent: () => ({}),

  activeMenuId: '',
  setActiveMenuId: () => ({}),

  currentMenuId: '',
  setCurrentMenuId: () => ({}),

  next: () => ({}),
  prev: () => ({}),
  getAboveSubmenuIds: () => [],
  setCurrentActive: () => ({}),
  setCurrentActiveFocus: () => ({}),
  setActiveFocus: () => ({}),
  setSubmenus: () => ({}),
};

export const MenuVerticalContext = React.createContext<UseMenuVerticalProps>(defaults); // context defaults are generated on render
