import * as React from 'react';
import { Link } from '@sk-web-gui/link';
import { Divider } from '@sk-web-gui/divider';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import { Logo } from './assets/logo';

export interface HeaderProps extends DefaultProps, React.HTMLAttributes<HTMLDivElement> {
  /* Title for main page */
  title?: string;
  /*Subtitle for page- optional */
  subtitle?: string;
  /* React node */
  children?: React.ReactNode;
  /* Wrapper for Logo-link, for example Next-Link */
  LogoLinkWrapperComponent?: React.ReactElement;
  /* onClick for Logo-link */
  logoLinkOnClick?: () => void;
  /* NotificationsAlert component */
  notificationsAlert?: React.ReactNode;
  /* UserMenu component */
  userMenu?: React.ReactNode;
  /* CSS-classes for top parent node */
  wrapperClasses?: string;
  /* CSS-classes for usermenu */
  userMenuClasses?: string;
  /* Main menu component */
  mainMenu?: React.ReactNode;
  /* Mobile menu component */
  mobileMenu?: React.ReactNode;
}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const {
    title,
    subtitle,
    className,
    children,
    LogoLinkWrapperComponent,
    logoLinkOnClick,
    notificationsAlert,
    userMenu,
    wrapperClasses,
    userMenuClasses,
    'aria-label': ariaLabel,
    mainMenu,
    mobileMenu,
    ...rest
  } = props;

  const LinkWrapper = ({ wrapper, children }: any) => {
    if (wrapper !== undefined) {
      return React.cloneElement(wrapper, { children });
    }
    return children;
  };

  const handleLogoLinkOnClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    logoLinkOnClick && logoLinkOnClick();
  };

  return (
    <>
      <nav ref={ref} {...rest} className={cx('sk-header', wrapperClasses)}>
        <div className={cx('sk-header-container')}>
          <div className={cx('sk-header-top-content', className)}>
            {title && (
              <LinkWrapper wrapper={LogoLinkWrapperComponent}>
                <Link
                  href="/"
                  onClick={logoLinkOnClick ? handleLogoLinkOnClick : undefined}
                  className="no-underline"
                  aria-label={ariaLabel || `${subtitle ? `${title} ${subtitle}` : `${title}`}. Gå till startsidan.`}
                >
                  <div className="flex flex-row items-center gap-6 cursor-pointer">
                    <div>
                      <Logo />
                    </div>
                    <Divider orientation="vertical" className="h-[4.4rem]" />
                    <span id="page-title" className="text-h4 font-header leading-lg font-bold text-dark-primary">
                      {title}
                      {subtitle && <span className="text-sm font-normal leading-sm block">{subtitle}</span>}
                    </span>
                  </div>
                </Link>
              </LinkWrapper>
            )}

            {children}

            {(notificationsAlert || userMenu) && (
              <div className={cx('sk-header-usermenu', userMenuClasses)}>
                <div className="sk-header-usermenu-content">
                  {notificationsAlert && notificationsAlert}
                  {userMenu && userMenu}
                </div>
              </div>
            )}
            {mobileMenu && <div className={cx('sk-header-mobilemenu', userMenuClasses)}>{mobileMenu}</div>}
          </div>
          {mainMenu && <div className="sk-header-bottom-content">{mainMenu}</div>}
        </div>
      </nav>
    </>
  );
});

if (__DEV__) {
  Header.displayName = 'Header';
}

export default Header;
