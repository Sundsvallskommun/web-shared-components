import type { DefaultColor } from '@sk-web-gui/utils';
import React from 'react';
import { NavigationBarContext } from './context';

export interface UseNavigationBarProps {
  color?: DefaultColor | 'tertiary';

  //** Index of current menuoption */
  current?: number;
  size?: 'md' | 'lg';
}

export const useNavigationBar = () => React.useContext(NavigationBarContext);
