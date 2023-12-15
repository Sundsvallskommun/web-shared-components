import { cx, __DEV__ } from '@sk-web-gui/utils';
import { Logo as LogoSvg, Symbol } from './assets';
import { DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { Divider } from '@sk-web-gui/divider';

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

export type InternalLogoProps = LogoWithText | LogoWithoutText;

export const InternalLogo = React.forwardRef<HTMLDivElement, InternalLogoProps>((props, ref) => {
  const { variant: _variant, title, subtitle, className, inverted = false, ...rest } = props;
  const variant = _variant || (!!title ? 'service' : 'logo');

  return (
    <div ref={ref} className={cx('sk-logo', className)} data-variant={variant} data-inverted={inverted} {...rest}>
      <figure role="img" className="sk-logo-figure">
        {variant === 'logo' ? <LogoSvg /> : <Symbol />}
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
  InternalLogo.displayName = 'Logo';
}

export default InternalLogo;
