import { Input, Select } from '@sk-web-gui/forms';
import { Pagination } from '@sk-web-gui/pagination';
import { __DEV__, cx } from '@sk-web-gui/utils';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useZebraTableClass } from './styles';
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

export interface IZebraTableProps {
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
  summary?: string;
  highlightedItemIndex?: number;
  changePage?: (page: number) => void;
  BottomComponent?: JSX.Element;
  background?: boolean;
  dense?: boolean;
  variant?: 'table' | 'datatable';
}

export type ZebraTableProps = IZebraTableProps & React.HTMLAttributes<HTMLTableElement>;

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

  const zebraTableClasses = useZebraTableClass();
  const [managedRows, setManagedRows] = useState(rows);
  const [sortModeAscending, setSortModeAscending] = useState(defaultSort.sortMode);
  const [_pageSize, setPageSize] = useState<number>(_propsPageSize);
  const pageSize = _pageSize || 1;
  const [sortIndex, setSortIndex] = useState<number>(defaultSort.idx);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [pages, setPages] = useState<number>(Math.ceil(_pages || rows.length / pageSize));
  const [rowHeight, setRowHeight] = useState<string>(_dense ? 'dense' : 'normal');

  const internalSortHandler = (idx: number) => {
    setSortModeAscending(sortIndex === idx ? !sortModeAscending : sortAscending);
    setSortIndex(idx);
  };
  const [highlightedPage, setHighlightedPage] = useState<number>(0);

  useEffect(() => {
    sortHandler(sortIndex, sortModeAscending);
  }, [sortIndex, sortModeAscending, sortHandler]);

  useEffect(() => {
    setSortIndex(defaultSort.idx);
    setSortModeAscending(defaultSort.sortMode);
  }, []);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    if (_pageSize) {
      setPageSize(_pageSize);
    }
  }, [_pageSize]);

  useEffect(() => {
    changePage && changePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (highlightedItemIndex !== undefined) {
      const itemPage = Math.floor(highlightedItemIndex / pageSize + 1);
      setHighlightedPage(itemPage);
      setCurrentPage(itemPage);
    }
  }, [highlightedItemIndex]);

  useEffect(() => {
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
          {variant === 'datatable' ? (
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
              className={zebraTableClasses}
              summary={summary ?? summary}
              data-dense={rowHeight === 'dense'}
            >
              {captionTitle && (
                <caption className="sr-only">
                  {variant === 'datatable' ? (
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
            <>
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
                  step={5}
                  className="max-w-[10rem]"
                  value={`${_pageSize}`}
                  onChange={(event) => setPageSize(parseInt(event.target.value))}
                />
              </div>

              <Pagination
                className="sk-zebratable-pagination"
                pages={pages}
                activePage={currentPage}
                changePage={(page: number) => setCurrentPage(page)}
              />
            </>
            <div className="sk-zebratable-bottom-section">
              <label className="sk-zebratable-bottom-section-label" htmlFor="pagiRowHeight">
                Radhöjd:
              </label>
              <Select
                id="pagiRowHeight"
                size="sm"
                value={{ label: rowHeight === 'dense' ? 'Tät' : 'Normal', data: rowHeight }}
                onChange={(option) => setRowHeight(option.data)}
              >
                <Select.Option value={{ label: 'Normal', data: 'normal' }} />
                <Select.Option value={{ label: 'Tät', data: 'dense' }} />
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
