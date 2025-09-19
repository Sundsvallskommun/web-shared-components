import { NavigationBarComponent, NavigationBarComponentProps } from './navigation-bar';
import { NavigationBarItem } from './navigation-bar-item';

interface NavigationBarProps extends React.ForwardRefExoticComponent<NavigationBarComponentProps> {
  Component: typeof NavigationBarComponent;
  Item: typeof NavigationBarItem;
}

const NavigationBar = {
  ...NavigationBarComponent,
  Component: NavigationBarComponent,
  Item: NavigationBarItem,
} as NavigationBarProps;

export { NavigationBar };
export type { NavigationBarProps };
export default NavigationBar;
