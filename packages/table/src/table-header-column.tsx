import React from 'react';
import { cx } from '@sk-web-gui/utils';

export const TableHeaderColumn = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<'th'>>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <th ref={ref} className={cx('sk-table-thead-manualth', className)} {...rest}>
        {children}
      </th>
    );
  }
);
