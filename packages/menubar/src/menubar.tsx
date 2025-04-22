import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { UseMenuBarProps } from './use-menubar';
import { MenuBarContext } from './context';
import { MenuBarItemProps } from './menubar-item';

export interface UseMenuBarData extends UseMenuBarProps {
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
  size?: 'md' | 'lg';
}

export const MenuBarComponent = React.forwardRef<HTMLUListElement, MenuBarComponentProps>((props, ref) => {
  const {
    color = 'tertiary',
    showBackground = false,
    className,
    children,
    current: _current,
    id: _id,
    size = 'lg',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    size,
  };

  const validChildren = getValidChildren<MenuBarItemProps>(children);
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
        data-size={size}
        {...rest}
      >
        {menuItems}
      </ul>
    </MenuBarContext.Provider>
  );
});

if (__DEV__) {
  MenuBarComponent.displayName = 'MenuBar';
}

export default MenuBarComponent;
