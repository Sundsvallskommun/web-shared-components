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
  variant?: 'submenu' | 'tabs' | 'headermenu';
  hideLine?: boolean;
  tabAlign?: 'left' | 'right' | 'center' | 'stretch';
  /* If your application is hosted at e.g. https://sundsvall.se/dev/test, input '/dev/test' */
  basePath?: string;
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
    hideLine: _hideLine,
    tabAlign = 'left',
    basePath,
  } = props;

  const onTabClickHandler = (event: React.MouseEvent | React.KeyboardEvent, item: IMenuItem) => {
    console.log(location.pathname);
    onTabChange && onTabChange(item);
    onTabClick && onTabClick(event, item);
  };

  const hideLine = _hideLine !== undefined ? _hideLine : variant === 'headermenu' ? true : false;

  const active = _active || location.pathname.replace(basePath || '', '');
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
