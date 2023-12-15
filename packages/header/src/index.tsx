import HeaderComponent, { HeaderComponentProps } from './header';

interface HeaderProps extends React.ForwardRefExoticComponent<HeaderComponentProps> {
  Component: typeof HeaderComponent;
}

export const Header = {
  ...HeaderComponent,
  Component: HeaderComponent,
} as HeaderProps;

export type { HeaderProps };
export default Header;
