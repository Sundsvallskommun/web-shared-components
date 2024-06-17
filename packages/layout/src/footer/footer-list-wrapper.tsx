import { cx } from '@sk-web-gui/utils';
import React from 'react';

export const FooterListWrapper = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'>>((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} className={cx('sk-footer-list-wrapper', className)} {...rest} />;
});
