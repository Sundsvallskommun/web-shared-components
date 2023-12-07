import { __DEV__ } from '@sk-web-gui/utils';
import { MenuVerticalComponent, MenuVerticalComponentProps } from './menu-vertical';
import { MenuVerticalBackButton } from './menu-vertical-backbutton';
import { MenuVerticalItem } from './menu-vertical-item';
import { MenuVerticalLabel } from './menu-vertical-label';
import { MenuVerticalNav } from './menu-vertical-nav';
import { MenuVerticalSubmenuButton } from './menu-vertical-submenu-button';
import { MenuVerticalProvider } from './menu-vertical-context';

interface MenuVerticalProps
  extends MenuVerticalComponentProps,
    React.ForwardRefExoticComponent<MenuVerticalComponentProps & React.RefAttributes<HTMLElement>> {
  Provider: typeof MenuVerticalProvider;
  Nav: typeof MenuVerticalNav;
  BackButton: typeof MenuVerticalBackButton;
  Label: typeof MenuVerticalLabel;
  SubmenuButton: typeof MenuVerticalSubmenuButton;
  Item: typeof MenuVerticalItem;
}

export const MenuVertical = MenuVerticalComponent as MenuVerticalProps;

MenuVertical.Provider = MenuVerticalProvider;
MenuVertical.Nav = MenuVerticalNav;
MenuVertical.BackButton = MenuVerticalBackButton;
MenuVertical.Label = MenuVerticalLabel;
MenuVertical.SubmenuButton = MenuVerticalSubmenuButton;
MenuVertical.Item = MenuVerticalItem;

if (__DEV__) {
  MenuVertical.displayName = 'MenuVertical';
}

export type { MenuVerticalProps };
export default MenuVertical;
