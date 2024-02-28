import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { Dispatch, SetStateAction } from 'react';

interface ITableFooterProps extends DefaultProps {
  children: JSX.Element | JSX.Element[] | string;
  _pageSize?: number;
  setPageSize?: Dispatch<SetStateAction<number>>;
  pages?: number;
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  rowHeight?: string;
  setRowHeight?: Dispatch<SetStateAction<string>>;
}

export interface TableFooterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'>,
    ITableFooterProps {}

export const TableFooter = React.forwardRef<HTMLDivElement, TableFooterProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <div ref={ref} className={cx('sk-table-bottom', className)} {...rest}>
      {children}
    </div>
  );
});
