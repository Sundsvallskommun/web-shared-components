import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { useMenuVertical } from './menu-vertical-context';
import { IMenuVerticalItemProps } from './menu-vertical-item';

export interface MenuVerticalSubmenuButtonProps extends DefaultProps, Omit<IMenuVerticalItemProps, 'children'> {
  children: string | JSX.Element;
  /** For e.g. Next Links to work, they need to be wrapped this way */
  wrapper?: JSX.Element;
  /**
   * @default large
   */
  size?: 'medium' | 'large';
  /**
   * @default false
   */
  disabled?: boolean;
  /**
   * @default false
   */
  treePath?: boolean;
}

export const MenuVerticalSubmenuButton: React.FC<MenuVerticalSubmenuButtonProps> = React.forwardRef<
  HTMLElement,
  MenuVerticalSubmenuButtonProps
>((props, ref) => {
  const {
    current: thisCurrent,
    menuIndex,
    children,
    menuId = '',
    parentMenuId = '',
    wrapper,
    size = 'large',
    disabled = false,
    treePath = false,
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
    setSubmenus,
    getAboveSubmenuIds,
  } = useMenuVertical();
  const [mounted, setMounted] = React.useState<boolean>(false);
  const menuRef = React.useRef<HTMLElement>(null);
  React.useImperativeHandle(ref, () => menuRef.current!, []);
  const _menuIndex = menuIndex !== undefined ? menuIndex : React.useId();
  const isCurrentItem = current === _menuIndex || thisCurrent;
  const isActiveItem = active === _menuIndex;
  const isFocusedItem = focused === _menuIndex;

  const isSubmenuOpen = menu[menuId]?.submenuOpen ?? false;

  const handleSubmenuKeyboard: React.KeyboardEventHandler<HTMLElement> = async (event) => {
    if (event.key === 'ArrowLeft') {
      if (parentMenuId === rootMenuId) return;
      menu[parentMenuId].setSubmenuOpen(false);
      setActive(menu[parentMenuId].parentLiMenuIndex);
      setFocused(menu[parentMenuId].parentLiMenuIndex);
      setActiveMenuId(menu[parentMenuId].parentMenuId);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      prev();
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      next();
    }
    if (event.key === 'Enter') {
      event.target?.dispatchEvent(new MouseEvent('click'));
    }
    if (event.key === ' ') {
      event.preventDefault();
      if (disabled) return;
      menu[menuId].setSubmenuOpen((open) => !open);
    }
    if (event.key === 'ArrowRight') {
      if (disabled) return;
      menu[menuId].setSubmenuOpen(true);
      setActive(menu[menuId].menuItems[0].props.menuIndex as number);
      setFocused(menu[menuId].menuItems[0].props.menuIndex as number);
      setActiveMenuId(menuId);
    }
  };

  const handleExpandToggle = () => {
    if (isSubmenuOpen) {
      menu[menuId].setSubmenuOpen(false);
      setActive(_menuIndex);
      setActiveMenuId(parentMenuId);
    } else {
      menu[menuId].setSubmenuOpen(true);
      setActive(menu[menuId].menuItems[0].props.menuIndex as number);
      setFocused(menu[menuId].menuItems[0].props.menuIndex as number);
      setActiveMenuId(menuId);
    }
  };

  const handleSubmenuOnClick = async () => {
    setActive(_menuIndex);
    setActiveMenuId(parentMenuId);
    setCurrent(_menuIndex);
    setCurrentMenuId(parentMenuId);
  };

  React.useEffect(() => {
    if (isCurrentItem) {
      setCurrent(_menuIndex);
      setCurrentMenuId(parentMenuId);
    }
    if (isCurrentItem || menu[menuId]?.menuItems.find((menuItem) => menuItem.props.menuIndex === current)) {
      // isCurrentItem or contains current item
      const aboveMenuIds = getAboveSubmenuIds(menuId);
      setSubmenus(false, { openMenuIds: aboveMenuIds });
    }
  }, [isCurrentItem, currentMenuId]);

  React.useEffect(() => {
    if (isActiveItem) {
      setActive(_menuIndex);
      setActiveMenuId(parentMenuId);
    }
  }, [isActiveItem, activeMenuId]);

  React.useEffect(() => {
    if (mounted && menuRef?.current) {
      if (isFocusedItem && isActiveItem) {
        menuRef.current && menuRef.current.focus();
      }
    } else {
      setMounted(true);
    }
  }, [isFocusedItem, isActiveItem, activeMenuId]);

  const getClonedChild = (child: JSX.Element | string): React.ReactNode => {
    const props = {
      ...rest,
      className: 'sk-menu-vertical-item-submenu-button',
      ref: menuRef,
      role: 'menuitem',
      tabIndex: isActiveItem ? 0 : -1,
      onKeyDown: handleSubmenuKeyboard,
      onClick: disabled ? undefined : handleSubmenuOnClick,
      'aria-disabled': disabled ? disabled : undefined,
      'aria-current': isCurrentItem ? 'page' : undefined,
      'aria-haspopup': true,
      'aria-expanded': isSubmenuOpen,
      'data-menuindex': _menuIndex,
      'data-menuid': menuId,
    };

    if (typeof child === 'string') {
      return React.cloneElement(
        <button>{children}</button>,
        Object.assign(props, {
          ...rest,
        })
      );
    }

    if (child.type === React.Fragment) {
      const grandchild = getValidChildren(child.props.children)[0];
      if (grandchild) {
        return React.cloneElement(child, { ...child.props, children: getClonedChild(grandchild) });
      }
    }

    return React.cloneElement(child, Object.assign(props, rest));
  };

  const getChildWithWrapper = () => {
    if (wrapper) {
      return React.cloneElement(wrapper, { ...wrapper.props, children: getClonedChild(children) });
    } else {
      return getClonedChild(children);
    }
  };

  const getExpandButton = () => {
    return (
      <button
        aria-hidden={true}
        tabIndex={-1}
        className="sk-menu-vertical-item-submenu-button-expand"
        onClick={disabled ? undefined : handleExpandToggle}
        aria-disabled={disabled ? disabled : undefined}
      >
        <Icon name={isSubmenuOpen ? 'chevron-up' : 'chevron-down'} />
      </button>
    );
  };

  return (
    <span className={cx('sk-menu-vertical-item-submenu', `sk-menu-vertical-item-submenu-${size}`)}>
      {treePath && (
        <span className="sk-menu-verticak-item-submenu-treePath">
          <svg width="16" height="52" viewBox="0 0 16 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 -1500V17C1 24.1797 6.8203 30 14 30H15" stroke="#B7B7BA" stroke-linecap="round" />
          </svg>
        </span>
      )}
      {getChildWithWrapper()}
      {getExpandButton()}
    </span>
  );
});

if (__DEV__) {
  MenuVerticalSubmenuButton.displayName = 'MenuVerticalSubmenuButton';
}

export default { MenuVerticalSubmenuButton };
