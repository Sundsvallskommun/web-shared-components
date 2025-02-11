import { Divider } from '@sk-web-gui/divider';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { Logo as LogoSvg, Symbol } from './assets';

interface ILogoProps extends DefaultProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Controls alert appearance
   * @default 'logo'
   */
  variant?: 'logo' | 'symbol' | 'service';
  /**
   * Adds a title next to the logo.
   * Switches variant to 'service' if set and variant is unset.
   * Uses the symbol version of the logotype.
   * Will not show if variant is set to 'logo' or 'symbol'
   * Is required if variant is set to 'service'
   */
  title?: string;
    /**
   * Controls which logo to display
   */
  logoType?: string;
  /**
   * Adds a subtitle below the title.
   * Will only be shown if variant is 'service'
   */
  subtitle?: string;
  /**
   * Inverts the colors of the logo
   */
  inverted?: boolean;
}

interface LogoWithoutText extends ILogoProps {
  variant?: 'logo' | 'symbol' | undefined;
  title?: string;
}
interface LogoWithText extends ILogoProps {
  variant: 'service';
  title: string;
  subtitle?: string;
}

export type LogoProps = LogoWithText | LogoWithoutText;

export const Logo = React.forwardRef<HTMLDivElement, LogoProps>((props, ref) => {
  const { variant: _variant, title, subtitle, className, inverted = false, logoType, ...rest } = props;
  const variant = _variant || (title ? 'service' : 'logo');

  const renderLogo = () => {
    if (logoType === 'ange') {
      return variant === 'logo' ? <p>Ångelogo</p> : <p>Ångesymbol</p>; //Need to change to correct svg logos
    }
    return variant === 'logo' ? <LogoSvg /> : <Symbol />
  }

  return (
    <div ref={ref} className={cx('sk-logo', className)} data-variant={variant} data-inverted={inverted} {...rest}>
      <figure role="img" className="sk-logo-figure">
        {renderLogo()}
      </figure>
      {variant === 'service' && (
        <>
          <Divider orientation="vertical" strong className="sk-logo-divider" />
          <div className="sk-logo-service-content">
            <span className="sk-logo-title" id="page-title">
              {title}
              {subtitle && <span className="sk-logo-subtitle">{subtitle}</span>}
            </span>
          </div>
        </>
      )}
    </div>
  );
});

if (__DEV__) {
  Logo.displayName = 'Logo';
}
