import React from 'react';
import { PopupMenuBaseProps } from './popup-menu';

export interface PopupMenuContextProps extends PopupMenuBaseProps {
  close?: () => void;
  isOpen?: boolean;
  open?: () => void;
  goTo?: 'first' | 'last' | undefined;
}

export const PopupMenuContext = React.createContext<PopupMenuContextProps>({});

export const usePopupMenu = () => React.useContext(PopupMenuContext);
