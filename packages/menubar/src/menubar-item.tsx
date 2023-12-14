import { DefaultProps, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { useMenuBar } from './menubar';

export interface MenuBarItemProps
  extends DefaultProps,
    Omit<React.ComponentPropsWithRef<'li'>, 'color' | 'children' | 'onClick'> {
  /** Color for menuoption. Is inherited from MenuBar */
  color?: 'tertiary' | 'juniskar' | 'bjornstigen' | 'gronsta' | 'vattjom';
  /** Set true if this is the current menuoption. Can be handled by MenuBar */
  current?: boolean;
  /** Set automatic */
  menuIndex?: number;
  /** Use <a> or <button>. For dropdown, use <PopupMenu> */
  children: JSX.Element;
  /** For e.g. Next Links to work, they need to wrapped this way */
  wrapper?: JSX.Element;
}

export const MenuBarItem = React.forwardRef<HTMLLIElement, MenuBarItemProps>((props, ref) => {
  const { color: propsColor, className, current: thisCurrent, children, menuIndex, wrapper, ...rest } = props;
  const { color: contextColor, current, setCurrent, next, prev, active } = useMenuBar();
  const [mounted, setMounted] = React.useState<boolean>(false);
  const color = propsColor || contextColor;
  const menuRef = React.useRef<HTMLElement>();

  React.useEffect(() => {
    if (thisCurrent && typeof menuIndex === 'number') {
      setCurrent && setCurrent(menuIndex);
    }
  }, [thisCurrent]);

  React.useEffect(() => {
    if (mounted) {
      if (active === menuIndex) {
        menuRef.current && menuRef.current.focus();
      }
    } else {
      setMounted(true);
    }
  }, [active]);

  const handleKeyboard = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev && prev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next && next();
    }
    if (event.key === 'Enter') {
      event.target?.dispatchEvent(new MouseEvent('click'));
    }
  };

  const getClonedChild = (child: JSX.Element): React.ReactNode => {
    if (child.type === React.Fragment) {
      const grandchild = getValidChildren(child.props.children)[0];
      if (grandchild) {
        return React.cloneElement(child, { ...child.props, children: getClonedChild(grandchild) });
      }
    }
    return React.cloneElement(child, {
      ...children.props,
      onKeyDown: handleKeyboard,
      ref: menuRef,
      role: 'menuitem',
      'aria-current': current === menuIndex ? 'page' : undefined,
      tabIndex: active === menuIndex ? 0 : -1,
    });
  };

  const getChildWithWrapper = () => {
    if (wrapper) {
      return React.cloneElement(wrapper, { ...wrapper.props, children: getClonedChild(children) });
    } else {
      return getClonedChild(children);
    }
  };

  return (
    <li data-color={color} ref={ref} className={cx('sk-menubar-item', className)} role="none" {...rest}>
      {getChildWithWrapper()}
    </li>
  );
});
