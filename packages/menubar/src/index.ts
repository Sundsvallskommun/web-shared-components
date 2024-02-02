import { MenuBarComponent, MenuBarComponentProps } from './menubar';
import { MenuBarItem } from './menubar-item';

interface MenuBarProps extends React.ForwardRefExoticComponent<MenuBarComponentProps> {
  Component: typeof MenuBarComponent;
  Item: typeof MenuBarItem;
}

const MenuBar = {
  ...MenuBarComponent,
  Component: MenuBarComponent,
  Item: MenuBarItem,
} as MenuBarProps;

export { MenuBar };
export type { MenuBarProps };
export default MenuBar;
