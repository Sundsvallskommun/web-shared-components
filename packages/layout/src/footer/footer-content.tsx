import { cx } from '@sk-web-gui/utils';
import React from 'react';

export const FooterContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'>>((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} className={cx('sk-footer-content', className)} {...rest} />;
});
