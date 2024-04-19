import { cx } from '@sk-web-gui/utils';
import React from 'react';

interface TableRowColumnProps extends React.ComponentPropsWithoutRef<'td'> {
  sticky?: boolean;
}

export const TableRowColumn = React.forwardRef<HTMLTableCellElement, TableRowColumnProps>((props, ref) => {
  const { children, className, sticky, ...rest } = props;

  return (
    <td ref={ref} className="sk-table-tbody-td" data-sticky={sticky} {...rest}>
      <span className={cx('sk-table-col-content', className)}>{children}</span>
    </td>
  );
});
