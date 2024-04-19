import { cx } from '@sk-web-gui/utils';

import React from 'react';

interface TableHeaderColumnProps extends React.ComponentPropsWithoutRef<'th'> {
  sticky?: boolean;
}

export const TableHeaderColumn = React.forwardRef<HTMLTableCellElement, TableHeaderColumnProps>((props, ref) => {
  const { className, children, sticky, ...rest } = props;

  return (
    <th ref={ref} className={'sk-table-th'} data-sticky={sticky} {...rest}>
      <span className={cx('sk-table-col-content', className)}>{children}</span>
    </th>
  );
});
