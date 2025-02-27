import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { MenuVerticalComponent, MenuVerticalComponentProps } from './menu-vertical';
import { Divider } from '@sk-web-gui/divider';
import { MenuIndex } from './types';
import { useMenuVertical } from './use-menu-vertical';

export interface IMenuVerticalItemProps extends DefaultProps {
  /** Set true to set to current */
  current?: boolean;
  /** Set to override menuIndex */
  menuIndex?: MenuIndex;
  /** Use <a> or <button>. For dropdown, use Another <MenuVertical> with a <MenuVertical.SubmenuButton> instead of first item */
  children?: React.JSX.Element;
  /** For e.g. Next Links to work, they need to be wrapped this way */
  wrapper?: React.JSX.Element;
  menuId?: string;
  parentMenuId?: string;
  /**
   * @default false
   */
  disabled?: boolean;
}

export interface MenuVerticalItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'color' | 'children' | 'onClick'>,
    IMenuVerticalItemProps {}

export const MenuVerticalItem: React.FC<MenuVerticalItemProps> = React.forwardRef<HTMLLIElement, MenuVerticalItemProps>(
  (props, ref) => {
    const {
      className,
      current: thisCurrent = false,
      children,
      menuIndex = 0,
      menuId = '',
      parentMenuId = '',
      wrapper,
      disabled = false,
      role,
      ...rest
    } = props;

    const {
      menu,
      rootMenuId,
      active,
      setActive,
      setFocused,
      focused,
      activeMenuId,
      setActiveMenuId,
      current,
      setCurrent,
      currentMenuId,
      setCurrentMenuId,
      prev,
      next,
    } = useMenuVertical();
    const menuRef = React.useRef<HTMLElement>(null);
    const autoId = React.useId();
    const _menuIndex = menuIndex !== undefined ? menuIndex : autoId;
    const isCurrentItem = current === _menuIndex || thisCurrent;
    const isActiveItem = active === _menuIndex;
    const isFocusedItem = focused === _menuIndex;
    const submenuOpen = menu[menuId]?.submenuOpen ?? false;

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        if (menuId === rootMenuId) return;
        menu[menuId].setSubmenuOpen(false);
        setActive(menu[menuId].parentLiMenuIndex);
        setFocused(menu[menuId].parentLiMenuIndex);
        setActiveMenuId(parentMenuId);
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        prev?.();
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        next?.();
      }
      if (event.key === 'Enter') {
        event.target?.dispatchEvent(new MouseEvent('click'));
      }
    };

    React.useEffect(() => {
      if (isCurrentItem) {
        setActive(_menuIndex);
        setActiveMenuId(menuId);
        setCurrent(_menuIndex);
        setCurrentMenuId(menuId);
      }
    }, [isCurrentItem, currentMenuId]);

    React.useEffect(() => {
      if (isActiveItem) {
        setActive(_menuIndex);
        setActiveMenuId(menuId);
      }
    }, [isActiveItem, activeMenuId]);

    React.useEffect(() => {
      if (isFocusedItem && isActiveItem) {
        menuRef.current?.focus();
      }
    }, [isFocusedItem, isActiveItem, activeMenuId, submenuOpen]);

    const getClonedChild = (child: React.JSX.Element): React.ReactNode => {
      if (child.type === React.Fragment) {
        const grandchild = getValidChildren(child.props.children)[0];
        if (grandchild) {
          return React.cloneElement(child, { ...child.props, children: getClonedChild(grandchild) });
        }
      }

      const submenu = React.Children.toArray(children).find((child) => {
        if (React.isValidElement(child) && typeof child?.type !== 'string') {
          switch (child?.type) {
            case MenuVerticalComponent:
              return true;
          }
        }
      }) as React.ReactElement<MenuVerticalComponentProps>;

      if (submenu) {
        return React.cloneElement(submenu, {
          ...submenu.props,
          menuId: menuId,
          parentLiMenuIndex: _menuIndex,
        });
      } else if (typeof child.props.children === 'string') {
        return React.cloneElement(child, {
          ...child.props,
          onKeyDown: handleKeyboard,
          ref: menuRef,
          role: child.props.role ?? 'menuitem',
          'aria-current': isCurrentItem ? 'page' : undefined,
          tabIndex: isActiveItem ? 0 : -1,
          'aria-disabled': disabled ? disabled : undefined,
          onClick: disabled ? undefined : child.props.onClick,
          children: React.cloneElement(<span />, { children: child.props.children }),
        });
      } else if (role === 'separator') {
        return React.cloneElement(child, {
          ...child.props,
        });
      } else {
        return React.cloneElement(child, {
          ...child.props,
          onKeyDown: handleKeyboard,
          ref: menuRef,
          role: child.props.role ?? 'menuitem',
          'aria-current': isCurrentItem ? 'page' : undefined,
          tabIndex: isActiveItem ? 0 : -1,
          'aria-disabled': disabled ? disabled : undefined,
          onClick: disabled ? undefined : child.props.onClick,
        });
      }
    };
    const getChildWithWrapper = () => {
      if (children) {
        if (wrapper) {
          return React.cloneElement(wrapper, { ...wrapper.props, children: getClonedChild(children) });
        } else {
          return getClonedChild(children);
        }
      } else {
        if (role === 'separator') {
          return React.cloneElement(<Divider />, {
            tabIndex: -1,
          });
        }
      }
    };

    return (
      <li
        ref={ref}
        className={cx('sk-menu-vertical-item', className, !menu[menuId].submenuOpen && 'hide')}
        role={role ?? 'none'}
        {...rest}
      >
        {getChildWithWrapper()}
      </li>
    );
  }
);

if (__DEV__) {
  MenuVerticalItem.displayName = 'MenuVerticalItem';
}

export default { MenuVerticalItem };
