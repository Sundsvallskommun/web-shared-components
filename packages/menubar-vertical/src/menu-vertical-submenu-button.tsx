import { Button, ButtonProps } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { IMenuVerticalItemProps } from './menu-vertical-item';
import { useMenuVertical } from './menu-vertical-context';

export interface MenuVerticalSubmenuButtonProps
  extends DefaultProps,
    Omit<IMenuVerticalItemProps, 'children'>,
    ButtonProps {}

export const MenuVerticalSubmenuButton: React.FC<MenuVerticalSubmenuButtonProps> = React.forwardRef<
  HTMLButtonElement,
  MenuVerticalSubmenuButtonProps
>((props, ref) => {
  const { current: thisCurrent, menuIndex, children, menuId = '', parentMenuId = '', ...rest } = props;
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
  const [mounted, setMounted] = React.useState<boolean>(false);
  const menuRef = React.useRef<HTMLButtonElement>(null);
  React.useImperativeHandle(ref, () => menuRef.current!, []);
  const _menuIndex = menuIndex !== undefined ? menuIndex : React.useId();
  const isCurrentItem = current === _menuIndex || thisCurrent;
  const isActiveItem = active === _menuIndex;
  const isFocusedItem = focused === _menuIndex;

  const isSubmenuOpen = menu[menuId].submenuOpen;

  const handleSubmenuKeyboard: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
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
      menu[menuId].setSubmenuOpen((open) => !open);
    }
    if (event.key === 'ArrowRight') {
      menu[menuId].setSubmenuOpen(true);
      setActive(menu[menuId].menuItems[0].props.menuIndex as number);
      setFocused(menu[menuId].menuItems[0].props.menuIndex as number);
      setActiveMenuId(menuId);
    }
  };

  const handleSubmenuOnClick = () => {
    if (isSubmenuOpen) {
      menu[menuId].setSubmenuOpen(false);
      setCurrent(_menuIndex);
      setCurrentMenuId(parentMenuId);
      setActive(_menuIndex);
      setActiveMenuId(parentMenuId);
    } else {
      menu[menuId].setSubmenuOpen(true);
      setCurrent(_menuIndex);
      setCurrentMenuId(parentMenuId);
      setActive(_menuIndex);
      setActiveMenuId(parentMenuId);
    }
  };

  React.useEffect(() => {
    if (isCurrentItem) {
      setCurrent(_menuIndex);
      setCurrentMenuId(parentMenuId);
    }
  }, [isCurrentItem, currentMenuId]);

  React.useEffect(() => {
    if (isActiveItem) {
      setActive(_menuIndex);
      setActiveMenuId(parentMenuId);
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

  return (
    <Button
      {...rest}
      className="sk-menu-vertical-item-submenu-button"
      ref={menuRef}
      role="menuitem"
      data-menuindex={_menuIndex}
      data-menuid={menuId}
      data-parentmenuid={parentMenuId}
      aria-current={isCurrentItem ? 'page' : undefined}
      tabIndex={isActiveItem ? 0 : -1}
      onKeyDown={handleSubmenuKeyboard}
      onClick={handleSubmenuOnClick}
      aria-haspopup={true}
      aria-expanded={isSubmenuOpen}
      rightIcon={<Icon name={isSubmenuOpen ? 'chevron-up' : 'chevron-down'} />}
    >
      {children}
    </Button>
  );
});

if (__DEV__) {
  MenuVerticalSubmenuButton.displayName = 'MenuVerticalSubmenuButton';
}

export default { MenuVerticalSubmenuButton };
