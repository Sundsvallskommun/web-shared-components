import { __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import TabItem, { IMenuItem } from './tab-item';

export interface TabMenuProps {
  menuData: Array<IMenuItem>;
  active: string;
  onTabChange: (path: string, id: string | number) => void;
  children: React.ReactNode;
}

export const TabMenu = React.forwardRef<HTMLDivElement, TabMenuProps>((props, ref) => {
  const { menuData, active, children, onTabChange } = props;

  const onTabClickHandler = (path: string, id: string | number) => {
    onTabChange(path, id);
  };

  return (
    <nav className="TabMenu">
      <div className="tab-wrapper">
        <ul>
          {menuData &&
            menuData.map(({ id, label, path }) => (
              <TabItem key={id} id={id} label={label} path={path} active={active} onTabClick={onTabClickHandler} />
            ))}
        </ul>
        {children}
      </div>
      <div className="underline" />
    </nav>
  );
});

export default TabMenu;

if (__DEV__) {
  TabMenu.displayName = 'TabMenu';
}
