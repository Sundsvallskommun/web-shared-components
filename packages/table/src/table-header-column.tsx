import React from 'react';
import { DefaultProps, cx } from '@sk-web-gui/utils';

interface ITableHeaderColumnProps extends DefaultProps {
  children: JSX.Element | JSX.Element[] | string;
  isColumnSortable?: boolean;
  isShown?: boolean;
  screenReaderOnly?: boolean;
}

export interface TableHeaderColumnProps
  extends Omit<React.HTMLAttributes<HTMLTableCellElement>, 'color' | 'children'>,
    ITableHeaderColumnProps {}

export const TableHeaderColumn = React.forwardRef<HTMLTableCellElement, TableHeaderColumnProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <th ref={ref} className={cx('sk-table-thead-manualth', className)} {...rest}>
      {children}
    </th>
  );
});
