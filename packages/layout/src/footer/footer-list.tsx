import { cx } from '@sk-web-gui/utils';
import React from 'react';

export const FooterList = React.forwardRef<HTMLUListElement, React.ComponentPropsWithRef<'ul'>>((props, ref) => {
  const { className, ...rest } = props;
  return <ul ref={ref} className={cx('sk-footer-list', className)} {...rest} />;
});
