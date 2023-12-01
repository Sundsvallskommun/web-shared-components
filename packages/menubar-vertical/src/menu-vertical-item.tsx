import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { MenuVerticalComponent, useMenuVertical } from './menu-vertical';

export interface IMenuVerticalItemProps extends DefaultProps {
  /** Set true if this is the current menuoption. Can be handled by MenuVertical */
  current?: boolean;
  /** Set automatic */
  menuIndex?: number;
  /** Set parent id */
  menuId?: string;
  /** Use <a> or <button>. For dropdown, use <PopupMenu> */
  children: JSX.Element;
  /** For e.g. Next Links to work, they need to wrapped this way */
  wrapper?: JSX.Element;
  parentMenuId?: string;
}

export interface MenuVerticalItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'color' | 'children' | 'onClick'>,
    IMenuVerticalItemProps {}

export const MenuVerticalItem: React.FC<MenuVerticalItemProps> = React.forwardRef<HTMLLIElement, MenuVerticalItemProps>(
  (props, ref) => {
    const {
      className,
      current: thisCurrent,
      children,
      menuIndex = 0,
      menuId = '',
      parentMenuId = '',
      wrapper,
      ...rest
    } = props;

    const { tree, rootId } = useMenuVertical();
    const { setActive: parentSetActive } = tree[parentMenuId];
    const { current, setCurrent, next, prev, active, setActive, setSubmenuOpen, parentLiMenuIndex } = tree[menuId];
    const [mounted, setMounted] = React.useState<boolean>(false);
    const menuRef = React.useRef<HTMLElement>();

    React.useEffect(() => {
      if (thisCurrent && typeof menuIndex === 'number') {
        setCurrent && setCurrent(menuIndex);
      }
    }, [thisCurrent]);

    React.useEffect(() => {
      if (active === menuIndex) {
        setSubmenuOpen && setSubmenuOpen(true);
      }
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
        if (menuId === rootId) return;
        setSubmenuOpen && setSubmenuOpen(false);
        setActive && setActive(null);
        parentSetActive && parentSetActive(parentLiMenuIndex);
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        prev && prev();
      }
      if (event.key === 'ArrowDown') {
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

      const submenu = React.Children.toArray(children).find((child) => {
        if (React.isValidElement(child) && typeof child?.type !== 'string') {
          switch ((child?.type as React.FC).displayName) {
            case MenuVerticalComponent.displayName:
              return true;
          }
        }
      }) as React.ReactElement;

      if (submenu) {
        return React.cloneElement(submenu, {
          ...submenu.props,
          menuId: menuId,
          parentLiMenuIndex: menuIndex,
        });
      } else {
        return React.cloneElement(child, {
          ...children.props,
          onKeyDown: handleKeyboard,
          ref: menuRef,
          role: 'menuitem',
          'aria-current': current === menuIndex ? 'page' : undefined,
          tabIndex: active === menuIndex ? 0 : -1,
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
      <li ref={ref} className={cx('sk-menu-vertical-item', className)} role="none" {...rest}>
        {getChildWithWrapper()}
      </li>
    );
  }
);

if (__DEV__) {
  MenuVerticalItem.displayName = 'MenuVerticalItem';
}

export default { MenuVerticalItem };
