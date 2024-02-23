import React from 'react';
import { PopupMenuBaseProps } from './popup-menu';

export enum GoTo {
  First = 'FIRST',
  Last = 'LAST',
}
export interface PopupMenuContextProps extends PopupMenuBaseProps {
  close?: (focusButton?: boolean) => void;
  isOpen?: boolean;
  open?: (goTo?: GoTo) => void;
  goTo?: GoTo;
  setGoTo?: (goTo?: GoTo) => void;
  id?: string;
  buttonId?: string;
  setButtonId?: (id: string) => void;
}

export const PopupMenuContext = React.createContext<PopupMenuContextProps>({});

export const usePopupMenu = () => React.useContext(PopupMenuContext);
