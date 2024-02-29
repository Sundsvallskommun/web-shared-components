import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { TableFooter } from './table-footer';

//eslint-disable-next-line
type TableValue = any;
type TableItem = Record<string | number, TableValue>;

export enum sortMode {
  ASC = 'ascending',
  DESC = 'descending',
}

export interface AutoTableHeader {
  property?: string;
  label?: string;
  isColumnSortable?: boolean;
  isShown?: boolean;
  screenReaderOnly?: boolean;
  columnPosition?: 'left' | 'center' | 'right';
  renderColumn?: (value: TableValue, item: TableItem) => JSX.Element;
}

export interface TableHeader {
  element: JSX.Element;
  isColumnSortable?: boolean;
  isShown?: boolean;
  screenReaderOnly?: boolean;
}

export interface AutoTableColumn {
  element: JSX.Element;
  isShown?: boolean;
}

interface UseTableProps {
  autoheaders?: Array<AutoTableHeader | string>;
  autodata?: Array<TableItem>;
  tableSortable?: boolean;
  defaultSort?: { idx: number; sortMode: sortMode.ASC | sortMode.DESC };
  sortedOrder?: sortMode;
  pageSize?: number;
  page?: number;
  pages?: number;
  captionTitle?: string;
  captionBody?: string;
  captionClassName?: string;
  captionShowPages?: boolean;
  summary?: string;
  highlightedItemIndex?: number;
  footer?: boolean;
  changePage?: (page: number) => void;
  background?: boolean;
  dense?: boolean;
}

export interface TableComponentProps
  extends DefaultProps,
    UseTableProps,
    Omit<React.ComponentPropsWithRef<'table'>, 'color'> {}

export const TableComponent = React.forwardRef<HTMLTableElement, TableComponentProps>((props, ref) => {
  const { summary, background = false, className, children, ...rest } = props;

  //MANUEL TABLE
  const validChildren = getValidChildren(children);
  const tableItems = validChildren
    .filter((child) => child.type !== TableFooter)
    .map((child, index) => {
      const props = { ...child.props, rowindex: index };

      return React.cloneElement(child, props);
    });

  const footerItem = validChildren.filter((child) => child.type === TableFooter);
  return (
    <div className={cx('sk-table-wrapper', className)} data-background={background}>
      <div className="sk-table-wrapper-inside">
        <table ref={ref} {...rest} className={'sk-table'} summary={summary ? summary : undefined}>
          {tableItems}
        </table>
        {footerItem}
      </div>
    </div>
  );
});

if (__DEV__) {
  TableComponent.displayName = 'Table';
}

export default TableComponent;
