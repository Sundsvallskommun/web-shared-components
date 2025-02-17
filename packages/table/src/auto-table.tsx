import { Input, Select } from '@sk-web-gui/forms';
import { Pagination } from '@sk-web-gui/pagination';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

import { TableHeader as HeaderComponent } from './table-header';
import { TableHeaderColumn } from './table-header-column';
import { TableSortButton } from './table-sort-button';
import { TableBody } from './table-body';
import { TableRow } from './table-row';
import { TableRowColumn } from './table-row-column';
import { TableFooter } from './table-footer';
import _ from 'lodash';
import Table, { TableComponentProps } from './table';
import { SortMode } from './types';

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
  sticky?: boolean;
  renderColumn?: (value: TableValue, item: TableItem) => React.JSX.Element;
}
export interface TableHeader {
  element: React.JSX.Element;
  isColumnSortable?: boolean;
  isShown?: boolean;
  screenReaderOnly?: boolean;
  sticky?: boolean;
}
export interface AutoTableColumn {
  element: React.JSX.Element;
  isShown?: boolean;
}

export interface AutoTableProps extends DefaultProps, TableComponentProps {
  autoheaders?: Array<AutoTableHeader | string>;
  autodata?: Array<TableItem>;

  handleSort?: (colIndex: number, asc: boolean) => void;
  tableSortable?: boolean;
  sortedOrder?: SortMode;
  /** @default 5 */
  pageSize?: number;
  /** @default select */
  pageSizeEdit?: 'select' | 'input' | boolean;
  /** @default [5,10,25,50,75,100] */
  pageSizeOptions?: Array<number>;
  /** @default select */
  rowHeightEdit?: 'select' | boolean;
  page?: number;
  captionTitle?: string;
  captionBody?: string;
  captionClassName?: string;
  captionShowPages?: boolean;
  highlightedItemIndex?: number;
  changePage?: (page: number) => void;
  footer?: boolean;
}

export const AutoTable = React.forwardRef<HTMLTableElement, AutoTableProps>((props, ref) => {
  const {
    autoheaders,
    autodata,
    pageSize: _propsPageSize = 5,
    pageSizeEdit = 'select',
    pageSizeOptions = [5, 10, 25, 50, 75, 100],
    rowHeightEdit = 'select',
    page = 1,
    changePage,
    captionTitle,
    captionBody,
    captionClassName,
    captionShowPages: _captionShowPages,
    summary,
    highlightedItemIndex,
    footer = true,
    tableSortable = true,
    sortedOrder = SortMode.ASC,
    dense: _dense = false,
    background = true,
    wrappingBorder = true,
    ...rest
  } = props;

  const defaultSort = { idx: 0, sortMode: sortedOrder };
  const _pages = 1;

  const [sortModeOrder, setSortModeOrder] = React.useState(defaultSort.sortMode);
  const [_pageSize, setPageSize] = React.useState<number>(_propsPageSize);
  const pageSize = _pageSize || 1;
  const [sortIndex, setSortIndex] = React.useState<number>(defaultSort.idx);
  const [currentPage, setCurrentPage] = React.useState<number>(page);

  const [rowHeight, setRowHeight] = React.useState<string>(_dense ? 'dense' : 'normal');
  const autoHeaders = autoheaders ?? [];
  const autoData = autodata ?? [];
  const [tableData, setTableData] = React.useState<TableItem[]>(autoData as Array<TableItem>);

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
    let isSticky = undefined;

    switch (typeof header) {
      case 'string':
        label = getLabel(header);
        break;

      default: {
        const { isColumnSortable = true, isShown = true, screenReaderOnly = false, sticky } = header;
        label = getLabel(header);
        isSortable = isColumnSortable;
        show = isShown;
        isScreenReaderOnly = screenReaderOnly;
        isSticky = sticky;
        break;
      }
    }

    return {
      element: <span>{label}</span>,
      isColumnSortable: isSortable,
      isShown: show,
      screenReaderOnly: isScreenReaderOnly,
      sticky: isSticky,
    };
  });

  const getAutoTableRows = (): AutoTableColumn[][] => {
    if (autoData.length < 1) return [[]];
    return tableData?.map((item) => {
      return autoHeaders?.map((header) => {
        let position = 'left';
        let show = true;
        switch (typeof header) {
          case 'string':
            break;

          default: {
            const { isShown = true } = header;
            show = isShown;
            position = header?.columnPosition || 'left';
            break;
          }
        }

        const value = getValue(item, header);

        let element = (
          <div className={'sk-table-auto-cell'} data-textalign={position}>
            {value}
          </div>
        );
        if (typeof header !== 'string' && header.renderColumn) {
          element = header.renderColumn(value, item);
        }
        return { element: element, isShown: show };
      });
    });
  };

  const tableRows: AutoTableColumn[][] = React.useMemo(() => {
    return getAutoTableRows();
  }, [autoData, autoHeaders, tableData]);

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
    [autoData, sortIndex, sortModeOrder, autodata]
  );

  const captionShowPages = _captionShowPages || footer ? true : false;

  const internalSortHandler = (idx: number) => {
    setSortModeOrder(
      sortIndex === idx ? (sortModeOrder === SortMode.DESC ? SortMode.ASC : SortMode.DESC) : SortMode.ASC
    );
    setSortIndex(idx);
  };
  const [highlightedPage, setHighlightedPage] = React.useState<number>(0);

  React.useEffect(() => {
    setCurrentPage(page ?? 1);
  }, [autodata]);

  React.useEffect(() => {
    handleSort(sortIndex, sortModeOrder === SortMode.DESC ? false : true);
  }, [sortIndex, sortModeOrder, handleSort]);

  React.useEffect(() => {
    setSortIndex(defaultSort.idx);
    setSortModeOrder(sortedOrder);
  }, [sortedOrder]);

  React.useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  React.useEffect(() => {
    if (_propsPageSize) {
      setPageSize(_propsPageSize);
    }
  }, [_propsPageSize]);

  React.useEffect(() => {
    setPages(Math.ceil(_pages || tableRows.length / pageSize));
  }, [page]);

  React.useEffect(() => {
    changePage?.(currentPage);
  }, [currentPage]);

  React.useEffect(() => {
    if (highlightedItemIndex !== undefined) {
      const itemPage = Math.floor(highlightedItemIndex / pageSize + 1);
      setHighlightedPage(itemPage);
      setCurrentPage(itemPage);
    }
  }, [highlightedItemIndex]);

  React.useEffect(() => {
    const newRows = tableRows ? [...tableRows.map((row) => [...row])] : [[]];
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
  }, [pageSize, currentPage, pages, sortModeOrder, sortIndex, autoHeaders, autoData, tableData]);

  return (
    <>
      {captionTitle && (
        <caption className={cx('sk-table-caption', captionClassName)} aria-hidden={true}>
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
      {managedRows.length > 0 && (
        <Table
          {...rest}
          background={background}
          ref={ref}
          dense={rowHeight === 'dense' || _dense}
          summary={summary ? summary : undefined}
          wrappingBorder={wrappingBorder}
        >
          {captionTitle && (
            <caption className="sk-table-caption-sr">
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
              h?.isShown || h?.isShown === null ? (
                <TableHeaderColumn
                  key={`header-${idx}`}
                  aria-sort={`${sortIndex == idx ? sortModeOrder : 'none'}`}
                  data-iscolumnsortable={h?.isColumnSortable}
                  sticky={h?.sticky}
                >
                  {h?.isColumnSortable && tableSortable ? (
                    <TableSortButton
                      isActive={sortIndex == idx}
                      aria-description={sortIndex == idx ? undefined : 'sortera'}
                      sortOrder={sortModeOrder || defaultSort.sortMode}
                      onClick={() => {
                        internalSortHandler(idx);
                      }}
                    >
                      <span>{h?.element}</span>
                    </TableSortButton>
                  ) : (
                    <span ref={ref} {...rest} className="sk-table-sortbutton" data-sronly={h?.screenReaderOnly}>
                      {h?.element}
                    </span>
                  )}
                </TableHeaderColumn>
              ) : (
                <></>
              )
            )}
          </HeaderComponent>
          <TableBody>
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
                    <TableRowColumn sticky={headers?.[idx]?.sticky} key={`col${idx}`}>
                      {element}
                    </TableRowColumn>
                  ) : (
                    <> </>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
          {footer ? (
            <TableFooter>
              {pageSizeEdit === 'select' || pageSizeEdit === true ? (
                <div className="sk-table-bottom-section">
                  <label className="sk-table-bottom-section-label" htmlFor="paginationSelect">
                    Rader per sida:
                  </label>
                  <Select
                    variant="tertiary"
                    id="paginationSelect"
                    size="sm"
                    value={`${_pageSize}`}
                    onSelectValue={(value) => setPageSize(parseInt(value))}
                  >
                    {pageSizeOptions.map((page) => (
                      <Select.Option key={`pagipage-${page}`} value={page.toString()}>
                        {page}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              ) : pageSizeEdit === 'input' ? (
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
                    className="sk-table-bottom-section-pagesize"
                    value={`${_pageSize}`}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPageSize(parseInt(event.target.value))}
                  />
                </div>
              ) : (
                <div className="sk-table-bottom-section spacer"></div>
              )}

              <div className="sk-table-paginationwrapper">
                <Pagination
                  className="sk-table-pagination"
                  pages={pages}
                  activePage={currentPage}
                  showConstantPages
                  pagesAfter={0}
                  pagesBefore={0}
                  changePage={(page: number) => setCurrentPage(page)}
                  fitContainer
                />
              </div>

              {rowHeightEdit === 'select' || rowHeightEdit === true ? (
                <div className="sk-table-bottom-section">
                  <label className="sk-table-bottom-section-label" htmlFor="pagiRowHeight">
                    Radhöjd:
                  </label>
                  <Select
                    variant="tertiary"
                    id="pagiRowHeight"
                    size="sm"
                    value={rowHeight}
                    onSelectValue={(value: string) => setRowHeight(value)}
                  >
                    <Select.Option value={'normal'}>Normal</Select.Option>
                    <Select.Option value={'dense'}>Tät</Select.Option>
                  </Select>
                </div>
              ) : (
                <div className="sk-table-bottom-section spacer"></div>
              )}
            </TableFooter>
          ) : (
            <></>
          )}
        </Table>
      )}
    </>
  );
});

if (__DEV__) {
  AutoTable.displayName = 'AutoTable';
}

export default AutoTable;
