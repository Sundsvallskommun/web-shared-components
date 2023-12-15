import { Input, Select } from '@sk-web-gui/forms';
import { Pagination } from '@sk-web-gui/pagination';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { ZTableHeader } from './zebratable-header';
export interface ZebraTableHeader {
  element: JSX.Element;
  isColumnSortable?: boolean;
  isShown?: boolean;
  screenReaderOnly?: boolean;
}
export interface ZebraTableColumn {
  element: JSX.Element;
  isShown?: boolean;
}

export interface ZebraTableProps extends DefaultProps, React.ComponentPropsWithRef<'table'> {
  headers: ZebraTableHeader[];
  rows: ZebraTableColumn[][];
  tableSortable?: boolean;
  sortHandler?: (idx: number, sortMode: boolean) => void;
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
  changePage?: (page: number) => void;
  BottomComponent?: JSX.Element;
  background?: boolean;
  dense?: boolean;
  variant?: 'table' | 'datatable';
}

export const ZebraTable = React.forwardRef<HTMLTableElement, ZebraTableProps>((props, ref) => {
  const {
    headers,
    rows,
    tableSortable = true,
    sortHandler = () => ({}),
    defaultSort = { idx: 0, sortMode: true },
    sortAscending = true,
    pageSize: _propsPageSize = 5,
    page = 1,
    pages: _pages,
    captionTitle,
    captionBody,
    captionClassName,
    captionShowPages: _captionShowPages,
    summary,
    highlightedItemIndex,
    changePage,
    BottomComponent,
    background = false,
    dense: _dense = false,
    variant = 'table',
    className,
    ...rest
  } = props;

  const [managedRows, setManagedRows] = React.useState(rows);
  const [sortModeAscending, setSortModeAscending] = React.useState(defaultSort.sortMode);
  const [_pageSize, setPageSize] = React.useState<number>(_propsPageSize);
  const pageSize = _pageSize || 1;
  const [sortIndex, setSortIndex] = React.useState<number>(defaultSort.idx);
  const [currentPage, setCurrentPage] = React.useState<number>(page);
  const [pages, setPages] = React.useState<number>(Math.ceil(_pages || rows.length / pageSize));
  const [rowHeight, setRowHeight] = React.useState<string>(_dense ? 'dense' : 'normal');

  const captionShowPages = _captionShowPages || variant === 'datatable' ? true : false;

  const internalSortHandler = (idx: number) => {
    setSortModeAscending(sortIndex === idx ? !sortModeAscending : sortAscending);
    setSortIndex(idx);
  };
  const [highlightedPage, setHighlightedPage] = React.useState<number>(0);

  React.useEffect(() => {
    sortHandler(sortIndex, sortModeAscending);
  }, [sortIndex, sortModeAscending, sortHandler]);

  React.useEffect(() => {
    setSortIndex(defaultSort.idx);
    setSortModeAscending(defaultSort.sortMode);
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
    if (pages > 0) {
      const newPages = Math.ceil(rows.length / pageSize);
      setPages(newPages);
      if (newPages < currentPage) {
        setCurrentPage(newPages);
      }
      const pageNumber = newPages < currentPage ? newPages : currentPage;
      const startIndex = pageNumber * pageSize - pageSize;
      setManagedRows(rows.slice(startIndex, startIndex + pageSize));
    } else {
      setManagedRows(rows);
    }
  }, [pageSize, currentPage, rows, pages]);

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
      <div className={cx('sk-zebratable-wrapper', className)} data-variant={variant} data-background={background}>
        <div className="sk-zebratable-wrapper-inside">
          {managedRows.length > 0 && (
            <table
              ref={ref}
              {...rest}
              className={'sk-zebratable'}
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

              <thead className="sk-zebratable-thead" data-background={background}>
                <tr className={cx(`sk-zebratable-thead-tr`)}>
                  {headers.map((h, idx) => (
                    <ZTableHeader
                      key={`header${idx}`}
                      {...h}
                      handleSort={internalSortHandler}
                      index={idx}
                      tableSortable={tableSortable}
                      sortIndex={sortIndex}
                      sortModeAscending={sortModeAscending}
                    />
                  ))}
                </tr>
              </thead>
              <tbody className="sk-zebratable-tbody">
                {managedRows.map((cols, idx) => (
                  <tr
                    key={`row${idx}`}
                    className={`sk-zebratable-tbody-tr ${
                      highlightedItemIndex !== undefined &&
                      highlightedItemIndex % pageSize === idx &&
                      highlightedPage === currentPage
                        ? `highlighted`
                        : ``
                    }`}
                  >
                    {cols.map(({ element, isShown = true }, idx) =>
                      isShown ? (
                        <td key={`col${idx}`} className="sk-zebratable-tbody-td">
                          {element}
                        </td>
                      ) : null
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {variant === 'datatable' && (
          <div className="sk-zebratable-bottom">
            <div className="sk-zebratable-bottom-section">
              <label className="sk-zebratable-bottom-section-label" htmlFor="pagiPageSize">
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

            <div className="sk-zebratable-paginationwrapper">
              <Pagination
                className="sk-zebratable-pagination"
                pages={pages}
                activePage={currentPage}
                showConstantPages
                pagesAfter={1}
                pagesBefore={1}
                changePage={(page: number) => setCurrentPage(page)}
                fitContainer
              />
            </div>
            <div className="sk-zebratable-bottom-section">
              <label className="sk-zebratable-bottom-section-label" htmlFor="pagiRowHeight">
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

            {BottomComponent && BottomComponent}
          </div>
        )}
      </div>
    </>
  );
});

if (__DEV__) {
  ZebraTable.displayName = 'ZebraTable';
}

export default ZebraTable;
