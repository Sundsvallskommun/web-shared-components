import React from 'react';

export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsStyleContextValue {
  size: TabsSize;
  underline: boolean;
}

export const defaultTabsStyle: TabsStyleContextValue = {
  size: 'md',
  underline: false,
};

export const TabsStyleContext = React.createContext<TabsStyleContextValue>(defaultTabsStyle);

export const useTabsStyle = () => React.useContext(TabsStyleContext);
