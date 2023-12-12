import { __DEV__ } from '@sk-web-gui/utils';
import HeaderComponent, { HeaderComponentProps } from './header';
import { HeaderLogoText } from './header-logotext';

interface HeaderProps
  extends HeaderComponentProps,
    React.ForwardRefExoticComponent<HeaderComponentProps & React.RefAttributes<HTMLElement>> {
  LogoText: typeof HeaderLogoText;
}

export const Header = HeaderComponent as HeaderProps;

Header.LogoText = HeaderLogoText;

if (__DEV__) {
  Header.displayName = 'Header';
}

export type { HeaderProps };
export default Header;
