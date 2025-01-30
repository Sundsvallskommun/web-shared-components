import React from 'react';

export interface TabsContextProps {
  next: () => void;
  prev: () => void;
  active: number;
  setCurrent: (index: number) => void;
  /** Color for taboption. Is inherited from Tabs */
  color: 'tertiary' | 'juniskar' | 'bjornstigen' | 'gronsta' | 'vattjom' | string;
  /** Set true if this is the current taboption. Can be handled by Tabs */
  current: number;
}

export const defaultTabsContext: TabsContextProps = {
  color: 'tertiary',
  current: 0,
  next: () => {},
  prev: () => {},
  active: 0,
  setCurrent: () => {},
};

export const TabsContext = React.createContext<TabsContextProps>(defaultTabsContext);
