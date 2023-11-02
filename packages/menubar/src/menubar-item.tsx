import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { useMenuBar } from './menubar';

interface IMenuBarItemProps extends DefaultProps {
  /** Color for menuoption. Is inherited from MenuBar */
  color?: 'tertiary' | 'juniskar' | 'bjornstigen' | 'gronsta' | 'vattjom';
  /** Set true if this is the current menuoption. Can be handled by MenuBar */
  current?: boolean;
  /** Set automatic */
  menuIndex?: number;
  /** Use <a> or <button>. For dropdown, use <PopupMenu> */
  children: JSX.Element;
}

export interface MenuBarItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'color' | 'children' | 'onClick'>,
    IMenuBarItemProps {}

export const MenuBarItem = React.forwardRef<HTMLLIElement, MenuBarItemProps>((props, ref) => {
  const { color: propsColor, className, current: thisCurrent, children, menuIndex, ...rest } = props;
  const { color: contextColor, current, setCurrent, next, prev, active } = useMenuBar();
  const [mounted, setMounted] = React.useState<boolean>(false);
  const color = propsColor || contextColor;
  const menuRef = React.useRef<HTMLElement>();
  React.useEffect(() => {
    if (thisCurrent && menuIndex && menuIndex !== current) {
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

  const getClonedChild = (child: JSX.Element) => {
    return React.cloneElement(child, {
      ...children.props,
      onKeyDown: handleKeyboard,
      ref: menuRef,
      role: 'menuitem',
      'aria-current': current === menuIndex ? 'page' : undefined,
      tabIndex: active === menuIndex ? 0 : -1,
    });
  };

  return (
    <li data-color={color} ref={ref} className={cx('sk-menubar-item', className)} role="none" {...rest}>
      {getClonedChild(children)}
    </li>
  );
});
