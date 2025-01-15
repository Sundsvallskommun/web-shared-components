import { DefaultProps, cx, getValidChildren, useForkRef } from '@sk-web-gui/utils';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import React from 'react';
import { useMenuBar } from './use-menubar';

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
      setCurrent?.(menuIndex);
    }
  }, [thisCurrent]);

  React.useEffect(() => {
    if (mounted) {
      if (active === menuIndex) {
        if (menuRef.current) {
          walkFocus(menuRef.current.children);
        }
      }
    } else {
      setMounted(true);
    }
  }, [active]);

  React.useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  const setFocus = (element: Element): boolean => {
    if (element) {
      if (element.getAttribute('role') === 'menuitem') {
        (element as HTMLElement).focus();
        return true;
      }
    }
    return false;
  };

  const walkFocus = (collection: HTMLCollection): boolean => {
    let focused = false;
    const elements = Array.from(collection);
    for (let index = 0; index < elements.length; index++) {
      if (!focused) {
        focused = setFocus(elements[index]);
        if (!focused && elements[index].children) {
          focused = walkFocus(elements[index].children);
        }
        if (focused) {
          break;
        }
      } else {
        break;
      }
    }

    return focused;
  };

  const handleKeyboard = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      prev?.();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      next?.();
    }
  };

  const getClonedChild = (child: JSX.Element): React.ReactNode => {
    if (child.type === React.Fragment) {
      const grandchildren = getValidChildren(child.props.children).map((child, index) => {
        return index === 0 ? getClonedChild(child) : child;
      });
      return React.cloneElement(child, { ...child.props, children: grandchildren });
    } else if (child.type === PopupMenu) {
      const grandchildren = getValidChildren(child.props.children).map((child) => {
        if (child.type === PopupMenu.Button) {
          const button = getClonedChild(child);
          return button;
        }
        return child;
      });

      return React.cloneElement(child, { ...child.props, children: grandchildren });
    } else {
      return React.cloneElement(child, {
        onKeyDown: handleKeyboard,
        role: 'menuitem',
        'aria-current': current === menuIndex ? 'page' : undefined,
        tabIndex: active === menuIndex ? 0 : -1,
        ...child.props,
      });
    }
  };

  const getChildWithWrapper = () => {
    if (wrapper) {
      return React.cloneElement(wrapper, { ...wrapper.props, children: getClonedChild(children) });
    } else {
      return getClonedChild(children);
    }
  };

  return (
    <li
      data-color={color}
      ref={useForkRef(ref, menuRef)}
      className={cx('sk-menubar-item', className)}
      role="none"
      {...rest}
    >
      {getChildWithWrapper()}
    </li>
  );
});
