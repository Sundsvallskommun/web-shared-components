import { cx } from '@sk-web-gui/utils';
import React from 'react';

export const TableFooter = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <div ref={ref} className={cx('sk-table-bottom', className)} {...rest}>
      {children}
    </div>
  );
});
