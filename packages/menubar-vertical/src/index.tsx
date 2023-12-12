import { __DEV__ } from '@sk-web-gui/utils';
import { MenuVerticalComponent, MenuVerticalComponentProps } from './menu-vertical';
import { MenuVerticalBackButton } from './menu-vertical-backbutton';
import { MenuVerticalItem } from './menu-vertical-item';
import { MenuVerticalLabel } from './menu-vertical-label';
import { MenuVerticalNav } from './menu-vertical-nav';
import { MenuVerticalSubmenuButton } from './menu-vertical-submenu-button';
import { MenuVerticalProvider } from './menu-vertical-context';
import { MenuVerticalSidebar } from './menu-vertical-sidebar';
import { MenuVerticalToolItem } from './menu-vertical-tool-item';
import { MenuVerticalHeader } from './menu-vertical-header';

interface MenuVerticalProps
  extends MenuVerticalComponentProps,
    React.ForwardRefExoticComponent<MenuVerticalComponentProps & React.RefAttributes<HTMLElement>> {
  Provider: typeof MenuVerticalProvider;
  Header: typeof MenuVerticalHeader;
  Nav: typeof MenuVerticalNav;
  Sidebar: typeof MenuVerticalSidebar;
  BackButton: typeof MenuVerticalBackButton;
  Label: typeof MenuVerticalLabel;
  SubmenuButton: typeof MenuVerticalSubmenuButton;
  Item: typeof MenuVerticalItem;
  ToolItem: typeof MenuVerticalToolItem;
}

export const MenuVertical = MenuVerticalComponent as MenuVerticalProps;

MenuVertical.Provider = MenuVerticalProvider;
MenuVertical.Header = MenuVerticalHeader;
MenuVertical.Nav = MenuVerticalNav;
MenuVertical.Sidebar = MenuVerticalSidebar;
MenuVertical.BackButton = MenuVerticalBackButton;
MenuVertical.Label = MenuVerticalLabel;
MenuVertical.SubmenuButton = MenuVerticalSubmenuButton;
MenuVertical.Item = MenuVerticalItem;
MenuVertical.ToolItem = MenuVerticalToolItem;

if (__DEV__) {
  MenuVertical.displayName = 'MenuVertical';
}

export type { MenuVerticalProps };
export default MenuVertical;
