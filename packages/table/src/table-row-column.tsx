import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';

interface ITableRowColumnProps extends DefaultProps {
  children: JSX.Element | JSX.Element[] | string;
}

export interface TableRowColumnProps
  extends Omit<React.HTMLAttributes<HTMLTableCellElement>, 'color' | 'children'>,
    ITableRowColumnProps {}

export const TableRowColumn = React.forwardRef<HTMLTableCellElement, TableRowColumnProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <td ref={ref} className={cx('sk-table-tbody-td sk-table-tbody-manualtd-content', className)} {...rest}>
      {children}
    </td>
  );
});
