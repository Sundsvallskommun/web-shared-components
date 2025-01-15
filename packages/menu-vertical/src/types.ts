import { MenuVerticalItemProps } from './menu-vertical-item';
import { MenuVerticalSubmenuButtonProps } from './menu-vertical-submenu-button';

export interface MenuItemTypes {
  submenuItem?: React.ReactElement<MenuVerticalSubmenuButtonProps>;
  menuItems: React.ReactElement<MenuVerticalItemProps>[];
}

export type MenuIndex = number | string | null | undefined;

export interface Submenu extends MenuItemTypes {
  parentMenuId: string;
  parentLiMenuIndex: MenuIndex;
  submenuOpen: boolean;
  setSubmenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Menu {
  [id: string]: Submenu;
}
