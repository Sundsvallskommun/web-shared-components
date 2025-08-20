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
  /**
   * onClick for Logo-link
   * Not in use if alternative logo is used.
   */
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
  /**
   *  Alternative logo
   *  If you want a linked logo, wrap it in a link component.
   */
  logo?: React.ReactNode;
}

export const HeaderComponent = React.forwardRef<HTMLDivElement, HeaderComponentProps>((props, ref) => {
  const {
    title,
    subtitle,
    className,
    children,
    logoLinkOnClick,
    notificationsAlert,
    userMenu,
    wrapperClasses,
    userMenuClasses,
    'aria-label': ariaLabel,
    mainMenu,
    mobileMenu,
    logo,
    ...rest
  } = props;

  const handleLogoLinkOnClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    logoLinkOnClick?.();
  };

  return (
    <nav ref={ref} {...rest} className={cx('sk-header', wrapperClasses)}>
      <div className={cx('sk-header-container')}>
        <div className={cx('sk-header-top-content', className)}>
          {logo
            ? logo
            : title && (
                <Link
                  href="/"
                  onClick={logoLinkOnClick ? handleLogoLinkOnClick : undefined}
                  className="no-underline"
                  aria-label={ariaLabel || `${subtitle ? `${title} ${subtitle}` : `${title}`}. Gå till startsidan.`}
                >
                  {<Logo variant="service" title={title} subtitle={subtitle} />}
                </Link>
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
