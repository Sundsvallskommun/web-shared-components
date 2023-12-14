import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';

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

export interface MenuBarComponentProps
  extends DefaultProps,
    UseMenuBarProps,
    Omit<React.ComponentPropsWithRef<'ul'>, 'color'> {
  showBackground?: boolean;
}

const MenuBarContext = React.createContext<UseMenuBarData>({});

export const useMenuBar = () => React.useContext(MenuBarContext);

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
  const [current, setCurrent] = React.useState<number | undefined>(_current);
  const [active, setActive] = React.useState<number>(_current || 0);
  const [mounted, setMounted] = React.useState<boolean>(false);
  const autoId = React.useId();
  const id = _id || `sk-menubar-${autoId}`;

  const total = React.Children.count(children);

  React.useEffect(() => {
    if (mounted) {
      handleSetCurrent(_current);
    } else {
      setMounted(true);
    }
  }, [_current]);

  const handleSetCurrent = (index: number | undefined) => {
    setCurrent(index);
    setActive(index || 0);
  };

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
    setCurrent: handleSetCurrent,
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

if (__DEV__) {
  MenuBarComponent.displayName = 'Menubar';
}

export default MenuBarComponent;
