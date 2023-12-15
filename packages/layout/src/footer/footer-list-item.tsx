import { cx } from '@sk-web-gui/utils';
import React from 'react';

export const FooterListItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithRef<'li'>>((props, ref) => {
  const { className, ...rest } = props;
  return <li ref={ref} className={cx('sk-footer-list-item', className)} {...rest} />;
});
