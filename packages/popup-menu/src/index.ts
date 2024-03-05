import { PopupMenuComponent, PopupMenuComponentProps } from './popup-menu';
import { PopupMenuButton } from './popup-menu-button';
import { PopupMenuGroup } from './popup-menu-group';
import { PopupMenuItem } from './popup-menu-item';
import { PopupMenuItems } from './popup-menu-items';
import { PopupMenuPanel } from './popup-menu-panel';

interface PopupMenuProps extends React.FC<PopupMenuComponentProps> {
  Panel: typeof PopupMenuPanel;
  Items: typeof PopupMenuItems;
  Item: typeof PopupMenuItem;
  Button: typeof PopupMenuButton;
  Group: typeof PopupMenuGroup;
}

const PopupMenu: PopupMenuProps = Object.assign(PopupMenuComponent, {
  Panel: PopupMenuPanel,
  Items: PopupMenuItems,
  Item: PopupMenuItem,
  Button: PopupMenuButton,
  Group: PopupMenuGroup,
});

export { PopupMenu };
export type { PopupMenuProps };
export default PopupMenu;
