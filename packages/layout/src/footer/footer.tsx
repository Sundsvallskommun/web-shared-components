import { Logo } from '@sk-web-gui/logo';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

export interface FooterProps extends DefaultProps, React.ComponentPropsWithRef<'footer'> {}

export const Footer = React.forwardRef<HTMLElement, FooterProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <footer ref={ref} className={cx(className, 'sk-footer')} {...rest}>
      <div className="sk-footer-innerwrapper">
        <div className="sk-footer-logo-wrapper">
          <Logo className="sk-footer-logo" aria-label="Sundsvalls kommun logotyp" />
        </div>
        <div className="sk-footer-content">{children}</div>
      </div>
    </footer>
  );
});

if (__DEV__) {
  Footer.displayName = 'Footer';
}

export default Footer;
