import React from 'react';
import { TabsContext, TabsContextProps } from './context';

export const useTabs = () => React.useContext<TabsContextProps>(TabsContext);
