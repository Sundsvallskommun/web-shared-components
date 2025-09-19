import React from 'react';
import { NavigationBarContext } from './context';

export interface UseNavigationBarProps {
  color?: 'tertiary' | 'juniskar' | 'bjornstigen' | 'gronsta' | 'vattjom' | string;

  //** Index of current menuoption */
  current?: number;
  size?: 'md' | 'lg';
}

export const useNavigationBar = () => React.useContext(NavigationBarContext);
