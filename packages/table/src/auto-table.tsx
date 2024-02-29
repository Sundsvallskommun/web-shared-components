import { Input, Select } from '@sk-web-gui/forms';
import { Pagination } from '@sk-web-gui/pagination';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

import { TableHeader as HeaderComponent } from './table-header';
import { TableHeaderColumn } from './table-header-column';
import { TableSortButton } from './table-sort-button';
import { TableRow } from './table-row';
import { TableRowColumn } from './table-row-column';
import { TableFooter } from './table-footer';
import _ from 'lodash';

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

export interface AutoTableProps extends DefaultProps, React.ComponentPropsWithRef<'table'> {
  autoheaders?: Array<AutoTableHeader | string>;
  autodata?: Array<TableItem>;

  handleSort: (colIndex: number, asc: boolean) => void;
  defaultSort?: {
    idx: number;
    sortMode: sortMode;
  };
  tableSortable?: boolean;
  sortedOrder?: sortMode;
  pageSize: number;
  pages: number;
  page: number;
  captionTitle?: string;
  captionBody?: string;
  captionClassName?: string;
  captionShowPages?: boolean;
  summary?: string;
  highlightedItemIndex?: number;
  changePage?: (page: number) => void;
  background?: boolean;
  dense?: boolean;
  footer?: boolean;
}

export const AutoTable = React.forwardRef<HTMLTableElement, AutoTableProps>((props, ref) => {
  const {
    autoheaders,
    autodata,
    pageSize: _propsPageSize = 5,
    page = 1,
    pages: _pages,
    changePage,
    captionTitle,
    captionBody,
    captionClassName,
    captionShowPages: _captionShowPages,
    summary,
    highlightedItemIndex,
    background,
    dense: _dense = false,
    footer,
    className,
    defaultSort = { idx: 0, sortMode: sortMode.ASC },
    ...rest
  } = props;

  const [sortModeOrder, setSortModeOrder] = React.useState(defaultSort.sortMode);
  const [_pageSize, setPageSize] = React.useState<number>(_propsPageSize);
  const pageSize = _pageSize || 1;
  const [sortIndex, setSortIndex] = React.useState<number>(defaultSort.idx);
  const [currentPage, setCurrentPage] = React.useState<number>(page);

  const [rowHeight, setRowHeight] = React.useState<string>(_dense ? 'dense' : 'normal');

  const [autoHeaders] = React.useState<Array<AutoTableHeader | string>>(
    autoheaders?.length === 0 || autoheaders === undefined ? [] : (autoheaders as Array<AutoTableHeader | string>)
  );
  const autoData = autodata?.length === 0 || autodata === undefined ? [] : (autodata as Array<TableItem>);
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

  const tableRows: AutoTableColumn[][] = autoTableRows();

  const [managedRows, setManagedRows] = React.useState(tableRows);
  const [pages, setPages] = React.useState<number>(Math.ceil(_pages || tableRows.length / pageSize));

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
    [autoData, sortIndex, sortModeOrder]
  );

  const captionShowPages = _captionShowPages || footer ? true : false;

  const internalSortHandler = (idx: number) => {
    setSortModeOrder(
      sortIndex === idx ? (sortModeOrder === sortMode.DESC ? sortMode.ASC : sortMode.DESC) : sortMode.ASC
    );
    setSortIndex(idx);
  };
  const [highlightedPage, setHighlightedPage] = React.useState<number>(0);

  React.useEffect(() => {
    handleSort(sortIndex, sortModeOrder === sortMode.DESC ? false : true);
  }, [sortIndex, sortModeOrder, handleSort]);

  React.useEffect(() => {
    setSortIndex(defaultSort.idx);
    setSortModeOrder(defaultSort.sortMode);
  }, []);

  React.useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  React.useEffect(() => {
    if (_pageSize) {
      setPageSize(_pageSize);
    }
  }, [_pageSize]);

  React.useEffect(() => {
    changePage && changePage(currentPage);
  }, [currentPage]);

  React.useEffect(() => {
    if (highlightedItemIndex !== undefined) {
      const itemPage = Math.floor(highlightedItemIndex / pageSize + 1);
      setHighlightedPage(itemPage);
      setCurrentPage(itemPage);
    }
  }, [highlightedItemIndex]);

  React.useEffect(() => {
    const newRows = [...tableRows];
    if (pages > 0) {
      const newPages = Math.ceil(tableRows.length / pageSize);
      setPages(newPages);
      if (newPages < currentPage) {
        setCurrentPage(newPages);
      }
      const pageNumber = newPages < currentPage ? newPages : currentPage;
      const startIndex = pageNumber * pageSize - pageSize;

      setManagedRows(newRows.slice(startIndex, startIndex + pageSize));
    } else {
      setManagedRows(newRows);
    }
  }, [pageSize, currentPage, pages, sortModeOrder, sortIndex]);

  return (
    <>
      {captionTitle && (
        <caption className={cx('text-left', captionClassName)} aria-hidden={true}>
          {captionShowPages ? (
            <>
              {captionTitle}, sida {currentPage} av {pages}.
            </>
          ) : (
            captionTitle
          )}
          {captionBody && (
            <>
              <br />
              <small>{captionBody}</small>
            </>
          )}
        </caption>
      )}
      <div className={cx('sk-table-wrapper', className)} data-footer={footer} data-background={background}>
        <div className="sk-table-wrapper-inside">
          {managedRows.length > 0 && (
            <table
              ref={ref}
              {...rest}
              className={'sk-table'}
              summary={summary ? summary : undefined}
              data-dense={rowHeight === 'dense'}
            >
              {captionTitle && (
                <caption className="sr-only">
                  {captionShowPages ? (
                    <>
                      {captionTitle}, sida {currentPage} av {pages}.
                    </>
                  ) : (
                    captionTitle
                  )}
                  {captionBody && (
                    <>
                      <br />
                      <small>{captionBody}</small>
                    </>
                  )}
                </caption>
              )}

              <HeaderComponent>
                {headers.map((h, idx) =>
                  h.isShown || h.isShown === null ? (
                    <TableHeaderColumn
                      key={`header-${idx}`}
                      aria-sort={`${sortIndex == idx ? sortModeOrder : 'none'}`}
                      data-iscolumnsortable={h.isColumnSortable}
                    >
                      {' '}
                      {h.isColumnSortable ? (
                        <TableSortButton
                          isActive={sortIndex == idx}
                          aria-description={sortIndex == idx ? undefined : 'sortera'}
                          sortOrder={sortModeOrder}
                          onClick={() => {
                            internalSortHandler(idx);
                          }}
                        >
                          <span>{h.element}</span>
                        </TableSortButton>
                      ) : (
                        <span
                          ref={ref}
                          {...rest}
                          className={cx('sk-table-sortbutton', `${h.screenReaderOnly ? `sr-only` : ``}`)}
                        >
                          {h.element}
                        </span>
                      )}
                    </TableHeaderColumn>
                  ) : (
                    <></>
                  )
                )}
              </HeaderComponent>
              <tbody>
                {managedRows.map((cols, idx) => (
                  <TableRow
                    key={`row${idx}`}
                    className={`${
                      highlightedItemIndex !== undefined &&
                      highlightedItemIndex % pageSize === idx &&
                      highlightedPage === currentPage
                        ? `highlighted`
                        : ``
                    }`}
                  >
                    {cols.map(({ element, isShown = true }, idx) =>
                      isShown ? (
                        <TableRowColumn key={`col${idx}`}>
                          <div className="sk-table-tbody-td-content">{element}</div>
                        </TableRowColumn>
                      ) : (
                        <> </>
                      )
                    )}
                  </TableRow>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {footer && (
          <TableFooter>
            <div className="sk-table-bottom-section">
              <label className="sk-table-bottom-section-label" htmlFor="pagiPageSize">
                Rader per sida:
              </label>
              <Input
                size="sm"
                id="pagePageSize"
                type="number"
                min={1}
                max={100}
                className="max-w-[6rem]"
                value={`${_pageSize}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPageSize(parseInt(event.target.value))}
              />
            </div>

            <div className="sk-table-paginationwrapper">
              <Pagination
                className="sk-table-pagination"
                pages={pages}
                activePage={currentPage}
                showConstantPages
                pagesAfter={1}
                pagesBefore={1}
                changePage={(page: number) => setCurrentPage(page)}
                fitContainer
              />
            </div>
            <div className="sk-table-bottom-section">
              <label className="sk-table-bottom-section-label" htmlFor="pagiRowHeight">
                Radhöjd:
              </label>
              <Select
                id="pagiRowHeight"
                size="sm"
                value={rowHeight}
                onSelectValue={(value: string) => setRowHeight(value)}
              >
                <Select.Option value={'normal'}>Normal</Select.Option>
                <Select.Option value={'dense'}>Tät</Select.Option>
              </Select>
            </div>
          </TableFooter>
        )}
      </div>
    </>
  );
});

if (__DEV__) {
  AutoTable.displayName = 'AutoTable';
}

export default AutoTable;
