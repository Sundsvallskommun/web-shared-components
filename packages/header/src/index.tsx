import HeaderComponent, { HeaderComponentProps } from './header';
import { HeaderLogoText } from './header-logotext';

interface HeaderProps extends React.ForwardRefExoticComponent<HeaderComponentProps> {
  Component: typeof HeaderComponent;
  LogoText: typeof HeaderLogoText;
}

export const Header = {
  ...HeaderComponent,
  Component: HeaderComponent,
  LogoText: HeaderLogoText,
} as HeaderProps;

export type { HeaderProps };
export default Header;
