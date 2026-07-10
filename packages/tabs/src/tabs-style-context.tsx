import React from 'react';

export type TabsColor = 'tertiary' | 'juniskar' | 'bjornstigen' | 'gronsta' | 'vattjom' | string;
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsStyleContextValue {
  color: TabsColor;
  size: TabsSize;
  underline: boolean;
}

export const defaultTabsStyle: TabsStyleContextValue = {
  color: 'tertiary',
  size: 'md',
  underline: false,
};

export const TabsStyleContext = React.createContext<TabsStyleContextValue>(defaultTabsStyle);

export const useTabsStyle = () => React.useContext(TabsStyleContext);
