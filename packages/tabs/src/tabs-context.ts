import React from 'react';

interface UseTabsProps {
  current: number;
  setCurrent?: (current: number) => void;
}

export const TabsContext = React.createContext<UseTabsProps>({ current: 0 });

export const useTabs = () => React.useContext(TabsContext);
