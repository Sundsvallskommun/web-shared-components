import React from 'react';
import {
  MenuVerticalContext,
  UseMenuVerticalProps,
  UseMenuVerticalPropsFunctions,
  UseMenuVerticalPropsStates,
} from './context';
import { MenuIndex } from './types';

export interface MenuVerticalProviderProps {
  children: React.JSX.Element | ((parameters: UseMenuVerticalProps) => React.JSX.Element);
  rootId?: UseMenuVerticalPropsStates['rootId'];
  rootMenuId?: UseMenuVerticalPropsStates['rootMenuId'];
  current?: UseMenuVerticalPropsStates['current'];
  focused?: UseMenuVerticalPropsStates['focused'];
  active?: UseMenuVerticalPropsStates['active'];
  activeMenuId?: UseMenuVerticalPropsStates['activeMenuId'];
  currentMenuId?: UseMenuVerticalPropsStates['currentMenuId'];
  menuAriaLabel?: UseMenuVerticalPropsStates['menuAriaLabel'];

  setCurrent?: UseMenuVerticalPropsFunctions['setCurrent'];
  setFocused?: UseMenuVerticalPropsFunctions['setFocused'];
  setActive?: UseMenuVerticalPropsFunctions['setActive'];
}

export function MenuVerticalProvider({
  children,
  menuAriaLabel,
  rootId: _rootId = 'sk-menu-vertical',
  rootMenuId: _rootMenuId = `${_rootId}-root`,
  activeMenuId: _activeMenuId = _rootMenuId,
  currentMenuId: _currentMenuId = _rootMenuId,

  // state handle overrides
  active: _active = null,
  focused: _focused = null,
  current: _current = null,
  setActive: _setActive,
  setFocused: _setFocused,
  setCurrent: _setCurrent,
}: MenuVerticalProviderProps) {
  const rootId: UseMenuVerticalProps['rootId'] = _rootId;
  const rootMenuId: UseMenuVerticalProps['rootMenuId'] = _rootMenuId;
  const [menu, setMenu] = React.useState<UseMenuVerticalProps['menu']>({});
  const [active, setActive] = React.useState<UseMenuVerticalProps['active']>(_active);
  const [focused, setFocused] = React.useState<UseMenuVerticalProps['focused']>(_focused);
  const [current, setCurrent] = React.useState<UseMenuVerticalProps['current']>(_current);
  const [activeMenuId, setActiveMenuId] = React.useState<UseMenuVerticalProps['activeMenuId']>(_activeMenuId);
  const [currentMenuId, setCurrentMenuId] = React.useState<UseMenuVerticalProps['currentMenuId']>(_currentMenuId);

  // state handle overrides
  const context_Active = _active ?? active;
  const context_Focused = _focused ?? focused;
  const context_Current = _current ?? current;
  const context_setActive = _setActive ?? setActive;
  const context_setFocused = _setFocused ?? setFocused;
  const context_setCurrent = _setCurrent ?? setCurrent;

  const getAboveSubmenuIds: UseMenuVerticalPropsFunctions['getAboveSubmenuIds'] = (
    menuId: string,
    menuIds: string[] = []
  ) => {
    menuIds = menuIds.concat([menuId]);
    if (menu[menuId]?.parentMenuId && menu[menuId].parentMenuId !== rootMenuId) {
      return getAboveSubmenuIds(menu[menuId].parentMenuId, menuIds);
    } else {
      return menuIds;
    }
  };

  const setSubmenus: UseMenuVerticalPropsFunctions['setSubmenus'] = (defaultOpen = true, options) => {
    Object.entries(menu).forEach(([menuId, submenu]) => {
      if (menuId === rootMenuId) return;
      if (options?.openMenuIds?.includes(menuId)) {
        return submenu.setSubmenuOpen(true);
      }
      if (options?.closeMenuIds?.includes(menuId)) {
        return submenu.setSubmenuOpen(false);
      }
      submenu.setSubmenuOpen(defaultOpen);
    });
  };

  const setCurrentActive: UseMenuVerticalPropsFunctions['setCurrentActive'] = (
    menuIndex: UseMenuVerticalProps['current']
  ) => {
    context_setCurrent(menuIndex);
    context_setActive(menuIndex);
  };

  const setCurrentActiveFocus: UseMenuVerticalPropsFunctions['setCurrentActiveFocus'] = (
    menuIndex: UseMenuVerticalProps['focused']
  ) => {
    context_setCurrent(menuIndex);
    context_setActive(menuIndex);
    context_setFocused(menuIndex);
  };

  const setActiveFocus: UseMenuVerticalPropsFunctions['setActiveFocus'] = (
    menuIndex: UseMenuVerticalProps['focused']
  ) => {
    context_setActive(menuIndex);
    context_setFocused(menuIndex);
  };

  const next: UseMenuVerticalPropsFunctions['next'] = () => {
    const activeMenuItemIndex = menu[activeMenuId].menuItems.findIndex((x) => x.props.menuIndex === context_Active);
    if (context_Active === null) return;
    if (activeMenuItemIndex === menu[activeMenuId].menuItems.length - 1) {
      setActiveFocus(menu[activeMenuId].menuItems[0].props.menuIndex as MenuIndex);
    } else {
      setActiveFocus(menu[activeMenuId].menuItems[activeMenuItemIndex + 1].props.menuIndex as MenuIndex);
    }
  };

  const prev: UseMenuVerticalPropsFunctions['prev'] = () => {
    const activeMenuItemIndex = menu[activeMenuId].menuItems.findIndex((x) => x.props.menuIndex === context_Active);
    if (context_Active === null) return;
    if (activeMenuItemIndex === 0) {
      setActiveFocus(menu[activeMenuId].menuItems[menu[activeMenuId].menuItems.length - 1].props.menuIndex as number);
    } else {
      setActiveFocus(menu[activeMenuId].menuItems[activeMenuItemIndex - 1].props.menuIndex as MenuIndex);
    }
  };

  React.useEffect(() => {
    context_setActive((menuIndex) =>
      menuIndex === null && menu[rootMenuId] ? (menu[rootMenuId].menuItems[0].props.menuIndex as MenuIndex) : menuIndex
    );
  }, []);

  const contextProps = {
    rootId,
    rootMenuId,
    menuAriaLabel,

    menu,
    setMenu,

    active: context_Active,
    setActive: context_setActive,

    focused: context_Focused,
    setFocused: context_setFocused,

    current: context_Current,
    setCurrent: context_setCurrent,

    activeMenuId,
    setActiveMenuId,

    currentMenuId,
    setCurrentMenuId,

    next,
    prev,
    getAboveSubmenuIds,
    setCurrentActive,
    setCurrentActiveFocus,
    setActiveFocus,
    setSubmenus,
  };

  const _children = typeof children === 'function' ? children({ ...contextProps }) : children;

  return <MenuVerticalContext.Provider value={contextProps}>{_children}</MenuVerticalContext.Provider>;
}
