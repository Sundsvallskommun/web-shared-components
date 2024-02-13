import { Input, Select } from '@sk-web-gui/forms';
import { Pagination } from '@sk-web-gui/pagination';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { AutoTableHeader } from './auto-table-headers';
import { TableHeader, AutoTableColumn } from './table';

export interface AutoTableProps extends DefaultProps, React.ComponentPropsWithRef<'table'> {
  headers: Array<TableHeader>;
  rows: AutoTableColumn[][];
  handleSort: (colIndex: number, asc: boolean) => void;
  defaultSort: {
    idx: number;
    sortMode: boolean;
  };
  tableSortable: boolean;
  sortAscending: boolean;
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
    headers,
    rows,
    handleSort,
    defaultSort,
    sortAscending,
    tableSortable,
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

  const captionShowPages = _captionShowPages || footer ? true : false;

  const internalSortHandler = (idx: number) => {
    setSortModeAscending(sortIndex === idx ? !sortModeAscending : sortAscending);
    setSortIndex(idx);
  };
  const [highlightedPage, setHighlightedPage] = React.useState<number>(0);

  React.useEffect(() => {
    handleSort(sortIndex, sortModeAscending);
  }, [sortIndex, sortModeAscending, handleSort]);

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

              <thead className="sk-table-thead" data-background={background}>
                <tr className={cx(`sk-table-thead-tr`)}>
                  {headers.map((h, idx) => (
                    <AutoTableHeader
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
              <tbody className="sk-table-tbody">
                {managedRows.map((cols, idx) => (
                  <tr
                    key={`row${idx}`}
                    className={`sk-table-tbody-tr ${
                      highlightedItemIndex !== undefined &&
                      highlightedItemIndex % pageSize === idx &&
                      highlightedPage === currentPage
                        ? `highlighted`
                        : ``
                    }`}
                  >
                    {cols.map(({ element, isShown = true }, idx) =>
                      isShown ? (
                        <td key={`col${idx}`} className="sk-table-tbody-td">
                          <div className="sk-table-tbody-td-content">{element}</div>
                        </td>
                      ) : null
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {footer && (
          <div className="sk-table-bottom">
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
          </div>
        )}
      </div>
    </>
  );
});

if (__DEV__) {
  AutoTable.displayName = 'AutoTable';
}

export default AutoTable;
