import { PopupMenuComponent, PopupMenuPropsInternal, PopupMenuItem, PopupMenuGroup } from './popup-menu';
import { PopupMenuButton } from './popup-menu-button';

interface PopupMenuProps extends React.ForwardRefExoticComponent<PopupMenuPropsInternal> {
  Component: typeof PopupMenuComponent;
  Item: typeof PopupMenuItem;
  Button: typeof PopupMenuButton;
  Group: typeof PopupMenuGroup;
}

const PopupMenu = {
  ...PopupMenuComponent,
  Component: PopupMenuComponent,
  Item: PopupMenuItem,
  Button: PopupMenuButton,
  Group: PopupMenuGroup,
} as PopupMenuProps;

export { PopupMenu };
export type { PopupMenuProps };
export default PopupMenu;
