import React from 'react';
import { cx } from '@sk-web-gui/utils';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'tbody'>>(
  (props, ref) => {
    const { children, className, ...rest } = props;
    return (
      <tbody ref={ref} className={cx('sk-table-tbody', className)} {...rest}>
        {children}
      </tbody>
    );
  }
);
