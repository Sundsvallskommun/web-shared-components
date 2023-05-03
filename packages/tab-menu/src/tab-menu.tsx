import { __DEV__, cx } from '@sk-web-gui/utils';
import * as React from 'react';
import { useTabMenuListClass, useTabMenuWrapperClass } from './styles';
import TabItem, { IMenuItem } from './tab-item';

export interface TabMenuProps {
  menuData: Array<IMenuItem>;
  active?: string;
  onTabChange?: (item: IMenuItem) => void;
  onTabClick?: (event: React.MouseEvent | React.KeyboardEvent, item: IMenuItem) => void;
  render?: (element: JSX.Element, item: IMenuItem, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  children: React.ReactNode;
  variant?: 'submenu' | 'tabs';
  hideLine?: boolean;
  tabAlign?: 'left' | 'right' | 'center' | 'stretch';
}

export const TabMenu = React.forwardRef<HTMLDivElement, TabMenuProps>((props, ref) => {
  const {
    menuData,
    active: _active,
    children,
    onTabChange,
    render,
    onTabClick,
    className,
    itemClassName,
    variant = 'submenu',
    hideLine,
    tabAlign = 'left',
  } = props;

  const onTabClickHandler = (event: React.MouseEvent | React.KeyboardEvent, item: IMenuItem) => {
    onTabChange && onTabChange(item);
    onTabClick && onTabClick(event, item);
  };

  const active = _active || location.pathname;
  const wrapperClasses = useTabMenuWrapperClass({ variant, tabAlign });
  const listClasses = useTabMenuListClass({ variant, hideLine, tabAlign });

  return (
    <nav className={cx('sk-tab-menu', className)}>
      <div className={cx(wrapperClasses)}>
        <ul role="menubar" aria-orientation="horizontal" className={cx(listClasses)}>
          {menuData &&
            menuData.map(({ id, label, path }, index) => (
              <TabItem
                className={cx(itemClassName)}
                key={id}
                id={id}
                label={label}
                path={path}
                active={active}
                onTabClick={(e) => onTabClickHandler(e, { id, label, path })}
                render={render ? render : undefined}
                index={index}
                variant={variant}
                tabAlign={tabAlign}
              />
            ))}
        </ul>
        {children}
      </div>
      {variant === 'submenu' && !hideLine && <div className="sk-tab-menu-underline" />}
    </nav>
  );
});

export default TabMenu;

if (__DEV__) {
  TabMenu.displayName = 'TabMenu';
}
