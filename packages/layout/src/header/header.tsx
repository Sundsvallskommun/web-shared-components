import React from 'react';
import { Link } from '@sk-web-gui/link';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import { Logo } from '@sk-web-gui/logo';

export interface HeaderComponentProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
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

interface LinkWrapper {
  children: React.ReactElement | string;
  wrapper?: React.ReactElement;
}

export const HeaderComponent = React.forwardRef<HTMLDivElement, HeaderComponentProps>((props, ref) => {
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

  const LinkWrapper = ({ wrapper, children }: LinkWrapper) => {
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
                <Logo variant="service" title={title} subtitle={subtitle} />
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
  );
});

if (__DEV__) {
  HeaderComponent.displayName = 'HeaderComponent';
}

export default HeaderComponent;
