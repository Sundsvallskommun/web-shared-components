import React from 'react';
import { UseMenuBarProps } from './use-menubar';

export interface UseMenuBarContext extends UseMenuBarProps {
  next?: () => void;
  prev?: () => void;
  active?: number;
  setCurrent?: (index: number) => void;
}

export const MenuBarContext = React.createContext<UseMenuBarContext>({});
