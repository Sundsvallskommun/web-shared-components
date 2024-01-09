import React from 'react';
import { MenuVerticalSubmenuButtonProps } from './menu-vertical-submenu-button';
import { MenuVerticalItemProps } from './menu-vertical-item';

export interface MenuItemTypes {
  submenuItem?: React.ReactElement<MenuVerticalSubmenuButtonProps>;
  menuItems: React.ReactElement<MenuVerticalItemProps>[];
}

export type MenuIndex = number | string | null | undefined;

interface Submenu extends MenuItemTypes {
  parentMenuId: string;
  parentLiMenuIndex: MenuIndex;
  submenuOpen: boolean;
  setSubmenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Menu {
  [id: string]: Submenu;
}

interface UseMenuVerticalPropsStates {
  rootId: string;
  rootMenuId: string;
  menu: Menu;
  active: MenuIndex;
  focused: MenuIndex;
  activeMenuId: string;
  current: MenuIndex;
  currentMenuId: string;
}

interface UseMenuVerticalPropsFunctions {
  setMenu: React.Dispatch<React.SetStateAction<Menu>>;
  setActive: React.Dispatch<React.SetStateAction<UseMenuVerticalPropsStates['active']>>;
  setActiveMenuId: React.Dispatch<React.SetStateAction<UseMenuVerticalPropsStates['activeMenuId']>>;
  setCurrent: React.Dispatch<React.SetStateAction<UseMenuVerticalPropsStates['current']>>;
  setFocused: React.Dispatch<React.SetStateAction<UseMenuVerticalPropsStates['focused']>>;
  setCurrentMenuId: React.Dispatch<React.SetStateAction<UseMenuVerticalPropsStates['currentMenuId']>>;
  next: () => void;
  prev: () => void;
  getAboveSubmenuIds: (menuId: string, menuIds?: string[]) => string[];
  setSubmenus: (defaultOpen?: boolean, options?: { openMenuIds?: string[]; closeMenuIds?: string[] }) => void;
  setCurrentActive: (menuIndex: UseMenuVerticalPropsStates['current']) => void;
  setCurrentActiveFocus: (menuIndex: UseMenuVerticalPropsStates['focused']) => void;
  setActiveFocus: (menuIndex: UseMenuVerticalPropsStates['focused']) => void;
}

export type UseMenuVerticalProps = UseMenuVerticalPropsStates & UseMenuVerticalPropsFunctions;

const defaults = {
  rootId: '',
  rootMenuId: '',

  menu: {},
  setMenu: () => ({}),

  active: '',
  setActive: () => ({}),

  focused: '',
  setFocused: () => ({}),

  current: '',
  setCurrent: () => ({}),

  activeMenuId: '',
  setActiveMenuId: () => ({}),

  currentMenuId: '',
  setCurrentMenuId: () => ({}),

  next: () => ({}),
  prev: () => ({}),
  getAboveSubmenuIds: () => [],
  setCurrentActive: () => ({}),
  setCurrentActiveFocus: () => ({}),
  setActiveFocus: () => ({}),
  setSubmenus: () => ({}),
};

const MenuVerticalContext = React.createContext<UseMenuVerticalProps>(defaults); // context defaults are generated on render

export const useMenuVertical = () => React.useContext(MenuVerticalContext);

export interface MenuVerticalProviderProps {
  children: JSX.Element | ((parameters: UseMenuVerticalProps) => JSX.Element);
  rootId?: UseMenuVerticalPropsStates['rootId'];
  rootMenuId?: UseMenuVerticalPropsStates['rootMenuId'];
  current?: UseMenuVerticalPropsStates['current'];
  focused?: UseMenuVerticalPropsStates['focused'];
  active?: UseMenuVerticalPropsStates['active'];
  activeMenuId?: UseMenuVerticalPropsStates['activeMenuId'];
  currentMenuId?: UseMenuVerticalPropsStates['currentMenuId'];

  setCurrent?: UseMenuVerticalPropsFunctions['setCurrent'];
  setFocused?: UseMenuVerticalPropsFunctions['setFocused'];
  setActive?: UseMenuVerticalPropsFunctions['setActive'];
}

export function MenuVerticalProvider({
  children,

  rootId: _rootId = 'sk-menu-vertical',
  rootMenuId: _rootMenuId = `${_rootId}-root`,

  active: _active = null,
  focused: _focused,
  activeMenuId: _activeMenuId = _rootMenuId,
  current: _current = null,
  currentMenuId: _currentMenuId = _rootMenuId,

  setActive: _setActive,
  setFocused: _setFocused,
  setCurrent: _setCurrent,
}: MenuVerticalProviderProps) {
  const rootId: UseMenuVerticalProps['rootId'] = _rootId;
  const rootMenuId: UseMenuVerticalProps['rootMenuId'] = _rootMenuId;
  const [menu, setMenu] = React.useState<UseMenuVerticalProps['menu']>({});
  const [active, setActive] = React.useState<UseMenuVerticalProps['active']>(_active);
  const [focused, setFocused] = React.useState<UseMenuVerticalProps['focused']>(_active);
  const [current, setCurrent] = React.useState<UseMenuVerticalProps['current']>(_current);
  const [activeMenuId, setActiveMenuId] = React.useState<UseMenuVerticalProps['activeMenuId']>(_activeMenuId);
  const [currentMenuId, setCurrentMenuId] = React.useState<UseMenuVerticalProps['currentMenuId']>(_currentMenuId);

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
    _setCurrent ? _setCurrent(menuIndex) : setCurrent(menuIndex);
    _setActive ? _setActive : setActive(menuIndex);

    // without this the current menu containing the menuItem wont open because no state change is triggered in submenuItem for isCurrentItem
    const __current = _current !== undefined ? _current : current;
    if (menuIndex === __current) {
      setSubmenus(false, { openMenuIds: getAboveSubmenuIds(currentMenuId) });
    }
  };

  const setCurrentActiveFocus: UseMenuVerticalPropsFunctions['setCurrentActiveFocus'] = (
    menuIndex: UseMenuVerticalProps['focused']
  ) => {
    _setCurrent ? _setCurrent(menuIndex) : setCurrent(menuIndex);
    _setActive ? _setActive : setActive(menuIndex);
    _setFocused ? _setFocused : setFocused(menuIndex);

    // without this the current menu containing the menuItem wont open because no state change is triggered in submenuItem for isCurrentItem
    const __current = _current !== undefined ? _current : current;
    if (menuIndex === __current) {
      setSubmenus(false, { openMenuIds: getAboveSubmenuIds(currentMenuId) });
    }
  };

  const setActiveFocus: UseMenuVerticalPropsFunctions['setActiveFocus'] = (
    menuIndex: UseMenuVerticalProps['focused']
  ) => {
    _setActive ? _setActive : setActive(menuIndex);
    _setFocused ? _setFocused : setFocused(menuIndex);

    // without this the current menu containing the menuItem wont open because no state change is triggered in submenuItem for isCurrentItem
    const __current = _current !== undefined ? _current : current;
    if (menuIndex === __current) {
      setSubmenus(false, { openMenuIds: getAboveSubmenuIds(currentMenuId) });
    }
  };

  const next: UseMenuVerticalPropsFunctions['next'] = () => {
    const activeMenuItemIndex = menu[activeMenuId].menuItems.findIndex((x) => x.props.menuIndex === active);
    if (active === null) return;
    if (activeMenuItemIndex === menu[activeMenuId].menuItems.length - 1) {
      setActiveFocus(menu[activeMenuId].menuItems[0].props.menuIndex as MenuIndex);
    } else {
      setActiveFocus(menu[activeMenuId].menuItems[activeMenuItemIndex + 1].props.menuIndex as MenuIndex);
    }
  };

  const prev: UseMenuVerticalPropsFunctions['prev'] = () => {
    const activeMenuItemIndex = menu[activeMenuId].menuItems.findIndex((x) => x.props.menuIndex === active);
    if (active === null) return;
    if (activeMenuItemIndex === 0) {
      setActiveFocus(menu[activeMenuId].menuItems[menu[activeMenuId].menuItems.length - 1].props.menuIndex as number);
    } else {
      setActiveFocus(menu[activeMenuId].menuItems[activeMenuItemIndex - 1].props.menuIndex as MenuIndex);
    }
  };

  React.useEffect(() => {
    _setActive
      ? _setActive((menuIndex: MenuIndex) =>
          menuIndex === null && menu[rootMenuId]
            ? (menu[rootMenuId].menuItems[0].props.menuIndex as MenuIndex)
            : menuIndex
        )
      : setActive((menuIndex) =>
          menuIndex === null && menu[rootMenuId]
            ? (menu[rootMenuId].menuItems[0].props.menuIndex as MenuIndex)
            : menuIndex
        );
  }, []);

  const contextProps = {
    rootId,
    rootMenuId,

    menu,
    setMenu,

    active: _active ? _active : active,
    setActive: _setActive ? _setActive : setActive,

    focused: _focused ? _focused : focused,
    setFocused: _setFocused ? _setFocused : setFocused,

    current: _current ? _current : current,
    setCurrent: _setCurrent ? _setCurrent : setCurrent,

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
