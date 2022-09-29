import { __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import TabItem, { IMenuItem } from './tab-item';

export interface ITabMenu {
  menuData: Array<IMenuItem>
  active: string | number
  onChange: (active: string | number) => void
} 

export const TabMenu = React.forwardRef<HTMLDivElement, ITabMenu>((props, ref) => {
  const {
    menuData,
    active
  } = props;

  return (
    <nav className="TabMenu">
      <div className="tab-wrapper">
        {menuData && menuData.map(({id, element: Component}) => 
          <TabItem 
            key={id} 
            id={id}
            active={active}
            element={<Component />}
          />
        )}
      </div>
      <div className="underline" />
    </nav>
  );
});

if (__DEV__) {
  TabMenu.displayName = 'TabMenu';
}