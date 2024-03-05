import { cx } from '@sk-web-gui/utils';
import React from 'react';

export const TableRowColumn = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<'td'>>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    return (
      <td ref={ref} className={cx('sk-table-tbody-td', className)} {...rest}>
        {children}
      </td>
    );
  }
);
