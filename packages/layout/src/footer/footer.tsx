import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

export interface FooterProps extends DefaultProps, React.ComponentPropsWithRef<'footer'> {}

export const Footer = React.forwardRef<HTMLElement, FooterProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <footer ref={ref} className={cx('sk-footer', className)} {...rest}>
      {children}
    </footer>
  );
});

if (__DEV__) {
  Footer.displayName = 'Footer';
}

export default Footer;
