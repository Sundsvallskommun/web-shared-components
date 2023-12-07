import { DefaultProps, __DEV__, cx, getValidChildren, __REACT_NAME__ } from '@sk-web-gui/utils';
import React from 'react';
import { MenuVerticalComponent, MenuVerticalComponentProps } from './menu-vertical';
import { MenuIndex, useMenuVertical } from './menu-vertical-context';

export interface IMenuVerticalItemProps extends DefaultProps {
  /** Set true to set to current */
  current?: boolean;
  /** Set to override menuIndex */
  menuIndex?: MenuIndex;
  /** Use <a> or <button>. For dropdown, use Another <MenuVertical> with a <MenuVertical.SubmenuButton> instead of first item */
  children: JSX.Element;
  /** For e.g. Next Links to work, they need to be wrapped this way */
  wrapper?: JSX.Element;
  menuId?: string;
  parentMenuId?: string;
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
      ...rest
    } = props;

    const contextProps = useMenuVertical();
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
      openAboveSubmenus,
    } = contextProps;
    const [mounted, setMounted] = React.useState<boolean>(false);
    const menuRef = React.useRef<HTMLElement>();
    const _menuIndex = menuIndex !== undefined ? menuIndex : React.useId();
    const isCurrentItem = current === _menuIndex || thisCurrent;
    const isActiveItem = active === _menuIndex;
    const isFocusedItem = focused === _menuIndex;

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

    React.useEffect(() => {
      if (isCurrentItem) {
        openAboveSubmenus(menuId);
        setCurrent(_menuIndex);
        setCurrentMenuId(menuId);
        setActive(_menuIndex);
        setActiveMenuId(menuId);
      }
    }, [isCurrentItem, currentMenuId]);

    React.useEffect(() => {
      if (isActiveItem) {
        openAboveSubmenus(menuId);
        setActive(_menuIndex);
        setActiveMenuId(menuId);
      }
    }, [isActiveItem, activeMenuId]);

    React.useEffect(() => {
      if (mounted) {
        if (isFocusedItem && isActiveItem) {
          menuRef.current && menuRef.current.focus();
        }
      } else {
        setMounted(true);
      }
    }, [isFocusedItem, isActiveItem, activeMenuId]);

    const getClonedChild = (child: JSX.Element): React.ReactNode => {
      if (child.type === React.Fragment) {
        const grandchild = getValidChildren(child.props.children)[0];
        if (grandchild) {
          return React.cloneElement(child, { ...child.props, children: getClonedChild(grandchild) });
        }
      }

      const submenu = React.Children.toArray(children).find((child) => {
        if (React.isValidElement(child) && typeof child?.type !== 'string') {
          switch ((child?.type as React.FC)[__REACT_NAME__]) {
            case MenuVerticalComponent[__REACT_NAME__]:
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
      } else {
        return React.cloneElement(child, {
          ...children.props,
          onKeyDown: handleKeyboard,
          ref: menuRef,
          role: 'menuitem',
          'aria-current': isCurrentItem ? 'page' : undefined,
          tabIndex: isActiveItem ? 0 : -1,
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
