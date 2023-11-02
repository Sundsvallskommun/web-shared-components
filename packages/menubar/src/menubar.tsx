import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React, { useState } from 'react';
import { MenuBarItem } from './menubar-item';

interface UseMenuBarProps {
  color?: 'tertiary' | 'juniskar' | 'bjornstigen' | 'gronsta' | 'vattjom';

  //** Index of current menuoption */
  current?: number;
}

interface UseMenuBarData extends UseMenuBarProps {
  next?: () => void;
  prev?: () => void;
  active?: number;
  setCurrent?: (index: number) => void;
}

interface IMenuBarComponentProps extends DefaultProps, UseMenuBarProps {
  showBackground?: boolean;
}

const MenuBarContext = React.createContext<UseMenuBarData>({});

export const useMenuBar = () => React.useContext(MenuBarContext);

export interface MenuBarComponentProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'color'>,
    IMenuBarComponentProps {}

export const MenuBarComponent = React.forwardRef<HTMLUListElement, MenuBarComponentProps>((props, ref) => {
  const {
    color = 'tertiary',
    showBackground = false,
    className,
    children,
    current: _current,
    id: _id,
    ...rest
  } = props;
  const [current, setCurrent] = useState<number | undefined>(_current);
  const [active, setActive] = useState<number>(_current || 0);

  const autoId = React.useId();
  const id = _id || `sk-menubar-${autoId}`;

  const total = React.Children.count(children);

  React.useEffect(() => {
    setCurrent(_current);
  }, [_current]);

  const next = () => {
    if (active === total - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active === 0) {
      setActive(total - 1);
    } else {
      setActive(active - 1);
    }
  };

  const context = {
    next,
    prev,
    current,
    setCurrent,
    color,
    active,
  };

  const validChildren = getValidChildren(children);
  const menuItems = validChildren.map((child, index) => {
    const props = { ...child.props, menuIndex: index };

    return React.cloneElement(child, props);
  });

  return (
    <MenuBarContext.Provider value={context}>
      <ul
        id={id}
        role="menubar"
        ref={ref}
        className={cx('sk-menubar', className)}
        data-color={color}
        data-background={showBackground}
        {...rest}
      >
        {menuItems}
      </ul>
    </MenuBarContext.Provider>
  );
});

interface MenuBarProps
  extends MenuBarComponentProps,
    React.ForwardRefExoticComponent<MenuBarComponentProps & React.RefAttributes<HTMLElement>> {
  Item: typeof MenuBarItem;
}

export const MenuBar = MenuBarComponent as MenuBarProps;

MenuBar.Item = MenuBarItem;

if (__DEV__) {
  MenuBar.displayName = 'Menubar';
}

export type { MenuBarProps };
export default MenuBar;
