import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { UseNavigationBarProps } from './use-navigation-bar';
import { NavigationBarContext } from './context';
import { NavigationBarItemProps } from './navigation-bar-item';

export interface UseNavigationBarData extends UseNavigationBarProps {
  next?: () => void;
  prev?: () => void;
  active?: number;
  setCurrent?: (index: number) => void;
}

export interface NavigationBarComponentProps
  extends DefaultProps,
    UseNavigationBarProps,
    Omit<React.ComponentPropsWithRef<'ul'>, 'color'> {
  showBackground?: boolean;
  size?: 'md' | 'lg';
}

export const NavigationBarComponent = React.forwardRef<HTMLUListElement, NavigationBarComponentProps>((props, ref) => {
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
  const id = _id || `sk-navigationbar-${autoId}`;

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

  const validChildren = getValidChildren<NavigationBarItemProps>(children);
  const menuItems = validChildren.map((child, index) => {
    const props = { ...child.props, menuIndex: index };

    return React.cloneElement(child, props);
  });

  return (
    <NavigationBarContext.Provider value={context}>
      <ul
        id={id}
        role="navigationbar"
        ref={ref}
        className={cx('sk-navigationbar', className)}
        data-color={color}
        data-background={showBackground}
        data-size={size}
        {...rest}
      >
        {menuItems}
      </ul>
    </NavigationBarContext.Provider>
  );
});

if (__DEV__) {
  NavigationBarComponent.displayName = 'NavigationBar';
}

export default NavigationBarComponent;
