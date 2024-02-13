import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import AutoTable from './auto-table';
import _ from 'lodash';

//eslint-disable-next-line
type TableValue = any;
type TableItem = Record<string | number, TableValue>;

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
  defaultSort?: { idx: number; sortMode: boolean };
  sortAscending?: boolean;
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
  variant?: 'table' | 'autotable';
}

export interface TableComponentProps
  extends DefaultProps,
    UseTableProps,
    Omit<React.ComponentPropsWithRef<'table'>, 'color'> {}

export const TableComponent = React.forwardRef<HTMLTableElement, TableComponentProps>((props, ref) => {
  const {
    autoheaders,
    autodata,
    sortAscending = true,
    tableSortable = true,
    defaultSort = { idx: 0, sortMode: true },
    pageSize,
    page,
    pages,
    captionTitle,
    captionBody,
    captionClassName,
    captionShowPages,
    summary,
    changePage,
    background = false,
    dense,
    variant = 'table',
    className,
    highlightedItemIndex,
    footer,
    children,
    ...rest
  } = props;

  //MANUEL TABLE
  const validChildren = getValidChildren(children);
  const tableItems = validChildren.map((child, index) => {
    const props = { ...child.props, rowindex: index };

    return React.cloneElement(child, props);
  });

  //AUTO TABLE
  const [autoHeaders] = React.useState<Array<AutoTableHeader | string>>(
    autoheaders?.length === 0 || autoheaders === undefined ? [] : (autoheaders as Array<AutoTableHeader | string>)
  );
  const [autoData] = React.useState<TableItem[]>(
    autodata?.length === 0 || autodata === undefined ? [] : (autodata as Array<TableItem>)
  );
  const [tableData, setTableData] = React.useState<TableItem[]>(autodata as Array<TableItem>);

  const getValue = (item: TableItem, header: string | AutoTableHeader): TableValue => {
    let headerparts = [];

    switch (typeof header) {
      case 'string':
        headerparts = header.split('.');
        break;

      default:
        headerparts = header?.property ? header?.property.split('.') : [];
        break;
    }
    const value = headerparts.reduce((value, headerpart) => {
      if (value !== null) {
        if (value) {
          return value[headerpart] ? value[headerpart] : undefined;
        }
        return undefined;
      }

      return item[headerpart];
    }, null);

    return value || '';
  };

  const getLabel = (header: AutoTableHeader | string) => {
    let headerparts;
    switch (typeof header) {
      case 'string':
        headerparts = header.split('.');
        return _.upperFirst(_.lowerCase(headerparts[headerparts.length - 1]));

      default:
        if (header.label) {
          return header.label;
        }
        headerparts = header.property ? header.property.split('.') : [];
        return headerparts.length ? _.upperFirst(_.lowerCase(headerparts[headerparts.length - 1])) : '';
    }
  };

  const headers: TableHeader[] = autoHeaders?.map((header) => {
    let label: string;
    let isSortable = true;
    let show = true;
    let isScreenReaderOnly = false;

    switch (typeof header) {
      case 'string':
        label = getLabel(header);
        break;

      default:
        const { isColumnSortable = true, isShown = true, screenReaderOnly = false } = header;
        label = getLabel(header);
        isSortable = isColumnSortable;
        show = isShown;
        isScreenReaderOnly = screenReaderOnly;
        break;
    }

    return {
      element: <span>{label}</span>,
      isColumnSortable: isSortable,
      isShown: show,
      screenReaderOnly: isScreenReaderOnly,
    };
  });

  const autoTableRows = (): AutoTableColumn[][] => {
    if (autoData.length < 1) return [[]];
    return tableData?.map((item) => {
      return autoHeaders?.map((header) => {
        let position = 'left';
        let show = true;
        switch (typeof header) {
          case 'string':
            break;

          default:
            const { isShown = true } = header;
            show = isShown;
            position = header?.columnPosition || 'left';
            break;
        }

        const value = getValue(item, header);

        let element = <div className={`w-full text-${position}`}>{value}</div>;
        if (typeof header !== 'string' && header.renderColumn) {
          element = header.renderColumn(value, item);
        }
        return { element: element, isShown: show };
      });
    });
  };

  const handleSort = React.useCallback(
    (colIndex: number, asc: boolean) => {
      if (autoData.length < 1) return;
      const mode = asc ? 1 : -1;
      const value = getValue(tableData[0], autoHeaders[colIndex]);
      let sortedData = [...autoData];
      switch (typeof value) {
        case 'number':
          sortedData = sortedData.sort(
            (a, b) => getValue(asc ? a : b, autoHeaders[colIndex]) - getValue(asc ? b : a, autoHeaders[colIndex])
          );

          break;
        case 'string':
          sortedData = sortedData.sort((a, b) =>
            getValue(a, autoHeaders[colIndex]).toLowerCase() > getValue(b, autoHeaders[colIndex]).toLowerCase()
              ? 1 * mode
              : getValue(a, autoHeaders[colIndex]).toLowerCase() < getValue(b, autoHeaders[colIndex]).toLowerCase()
                ? -1 * mode
                : 0
          );
          break;
        default:
          sortedData = sortedData.sort((a, b) =>
            getValue(a, autoHeaders[colIndex]) > getValue(b, autoHeaders[colIndex])
              ? 1 * mode
              : getValue(a, autoHeaders[colIndex]) < getValue(b, autoHeaders[colIndex])
                ? -1 * mode
                : 0
          );
          break;
      }
      setTableData(sortedData);
    },
    [autodata]
  );

  //TABLE VARIANTS
  return (
    <>
      {captionTitle && (
        <caption className={cx('text-left', captionClassName)} aria-hidden={true}>
          {captionTitle}
          {captionBody && (
            <>
              <br />
              <small>{captionBody}</small>
            </>
          )}
        </caption>
      )}
      <div className={cx('sk-table-wrapper', className)} data-background={background}>
        <div className="sk-table-wrapper-inside">
          {variant === 'table' ? (
            <table ref={ref} {...rest} className={'sk-table'} summary={summary ? summary : undefined}>
              {tableItems}
            </table>
          ) : (
            <>
              <AutoTable
                headers={headers}
                rows={autoTableRows()}
                handleSort={handleSort}
                defaultSort={defaultSort}
                changePage={changePage}
                page={page as number}
                pageSize={pageSize as number}
                pages={pages as number}
                sortAscending={sortAscending as boolean}
                tableSortable={tableSortable as boolean}
                dense={dense}
                captionShowPages={captionShowPages}
                highlightedItemIndex={highlightedItemIndex}
                footer={footer}
                {...props}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
});

if (__DEV__) {
  TableComponent.displayName = 'Table';
}

export default TableComponent;
