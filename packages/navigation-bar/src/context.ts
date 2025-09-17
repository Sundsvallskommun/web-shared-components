import React from 'react';
import { UseNavigationBarProps } from './use-navigation-bar';

export interface UseNavigationBarContext extends UseNavigationBarProps {
  next?: () => void;
  prev?: () => void;
  active?: number;
  setCurrent?: (index: number) => void;
  size?: 'md' | 'lg';
}

export const NavigationBarContext = React.createContext<UseNavigationBarContext>({});
