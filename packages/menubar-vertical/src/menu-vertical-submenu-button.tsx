import { Button, ButtonProps } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { useMenuVertical } from './menu-vertical';
import { IMenuVerticalItemProps } from './menu-vertical-item';

export interface MenuVerticalSubmenuButtonProps
  extends DefaultProps,
    Omit<IMenuVerticalItemProps, 'children'>,
    ButtonProps {}

export const MenuVerticalSubmenuButton: React.FC<MenuVerticalSubmenuButtonProps> = React.forwardRef<
  HTMLButtonElement,
  MenuVerticalSubmenuButtonProps
>((props, ref) => {
  const {
    current: thisCurrent,
    active: thisActive,
    menuIndex,
    children,
    menuId = '',
    parentMenuId = '',
    ...rest
  } = props;
  const { tree, rootId } = useMenuVertical();
  const {
    current,
    setCurrent,
    prev,
    next,
    active,
    setActive: parentSetActive,
    setSubmenuOpen: parentSetSubmenuOpen,
  } = tree[parentMenuId];
  const { submenuOpen, setSubmenuOpen, setActive: childSetActive, setCurrent: childSetCurrent } = tree[menuId];
  const [mounted, setMounted] = React.useState<boolean>(false);
  const menuRef = React.useRef<HTMLButtonElement>(null);
  React.useImperativeHandle(ref, () => menuRef.current!, []);

  const closeSubmenu = (_setCurrent: boolean = false) => {
    // parentSetSubmenuOpen && parentSetSubmenuOpen(false);
    setSubmenuOpen && setSubmenuOpen(false);
    childSetActive && childSetActive(null);
    parentSetActive && parentSetActive(null);
    // grandparent
    console.log('tree', tree);
    console.log('tree[parentMenuId]', tree[parentMenuId]);
    console.log('tree[parentMenuId].parentMenuId', tree[parentMenuId].parentMenuId);
    tree[tree[parentMenuId].parentMenuId].setActive(tree[menuId].parentLiMenuIndex);
    if (_setCurrent) {
      childSetCurrent && childSetCurrent(null);

      setCurrent && setCurrent(tree[menuId].parentLiMenuIndex);
    }
  };

  const openSubmenu = (_setCurrent: boolean = false) => {
    setSubmenuOpen && setSubmenuOpen(true);
    childSetActive && childSetActive(0);
    parentSetActive && parentSetActive(null);
    if (_setCurrent) {
      const grandParentSetCurrent = tree[tree[parentMenuId].parentMenuId].setCurrent;
      grandParentSetCurrent && grandParentSetCurrent(null);
      childSetCurrent && childSetCurrent(null);
      setCurrent && setCurrent(tree[menuId].parentLiMenuIndex);
    }
  };

  const handleSubmenuKeyboard: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (event.key === 'ArrowLeft') {
      if (parentMenuId === rootId) return;
      closeSubmenu();
      parentSetSubmenuOpen && parentSetSubmenuOpen(false);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      prev && prev();
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      next && next();
    }
    if (event.key === 'Enter' || event.key === 'ArrowRight') {
      event.target?.dispatchEvent(new MouseEvent('click'));
      openSubmenu();
    }
  };

  const handleSubmenuOnClick = () => {
    console.log('tree', tree);
    if (tree[menuId].submenuOpen) {
      closeSubmenu(true);
    } else {
      openSubmenu(true);
    }
  };

  React.useEffect(() => {
    if (thisCurrent && typeof menuIndex === 'number') {
      setCurrent && setCurrent(menuIndex);
    }
  }, [thisCurrent]);

  React.useEffect(() => {
    if (mounted) {
      if (active === menuIndex || thisActive) {
        menuRef.current && menuRef.current.focus();
      }
    } else {
      setMounted(true);
    }
  }, [active, thisActive]);
  console.log('submenuItem', menuId, menuIndex, current, active);
  return (
    <Button
      {...rest}
      className="sk-menu-vertical-item-submenu-button"
      ref={menuRef}
      role="menuitem"
      data-menuindex={menuIndex}
      aria-current={current === menuIndex ? 'page' : undefined}
      tabIndex={active === menuIndex ? 0 : -1}
      onKeyDown={handleSubmenuKeyboard}
      onClick={handleSubmenuOnClick}
      aria-haspopup={true}
      aria-expanded={submenuOpen}
      rightIcon={<Icon name={submenuOpen ? 'chevron-up' : 'chevron-down'} />}
    >
      {children}
    </Button>
  );
});

if (__DEV__) {
  MenuVerticalSubmenuButton.displayName = 'MenuVerticalSubmenuButton';
}

export default { MenuVerticalSubmenuButton };
