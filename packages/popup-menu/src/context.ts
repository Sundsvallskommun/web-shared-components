import React from 'react';

export interface PopupMenuItemsContextProps {
  next?: () => void;
  prev?: () => void;
  active?: string;
  activeMode?: 'soft' | 'hard';
  navigate?: boolean;
  setNavigate?: (navigate: boolean) => void;
}
export const PopupMenuItemsContext = React.createContext<PopupMenuItemsContextProps>({});
