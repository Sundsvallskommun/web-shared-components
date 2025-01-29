import React from 'react';
import { MenuBarContext } from './context';

export interface UseMenuBarProps {
  color?: 'tertiary' | 'juniskar' | 'bjornstigen' | 'gronsta' | 'vattjom' | string;

  //** Index of current menuoption */
  current?: number;
}

export const useMenuBar = () => React.useContext(MenuBarContext);
