import { PopupMenuComponent, PopupMenuComponentProps } from './popup-menu';
import { PopupMenuButton } from './popup-menu-button';
import { PopupMenuGroup } from './popup-menu-group';
import { PopupMenuItem } from './popup-menu-item';
import { PopupMenuItems } from './popup-menu-items';

interface PopupMenuProps extends React.ForwardRefExoticComponent<PopupMenuComponentProps> {
  Component: typeof PopupMenuComponent;
  Items: typeof PopupMenuItems;
  Item: typeof PopupMenuItem;
  Button: typeof PopupMenuButton;
  Group: typeof PopupMenuGroup;
}

const PopupMenu = {
  ...PopupMenuComponent,
  Component: PopupMenuComponent,
  Items: PopupMenuItems,
  Item: PopupMenuItem,
  Button: PopupMenuButton,
  Group: PopupMenuGroup,
} as PopupMenuProps;

export { PopupMenu };
export type { PopupMenuProps };
export default PopupMenu;
