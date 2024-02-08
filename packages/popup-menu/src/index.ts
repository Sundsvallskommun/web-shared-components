import PopupMenuComponent, { PopupMenuComponentProps, PopupMenuGroup } from './popup-menu';
import { PopupMenuButton } from './popup-menu-button';
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
