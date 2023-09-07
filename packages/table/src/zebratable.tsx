import { cx, __DEV__ } from '@sk-web-gui/utils';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useZebraTableClass } from './styles';
import { Pagination } from '@sk-web-gui/pagination';
import { ZTableHeader } from './zebratable-header';
import { FormControl, FormLabel, Select } from '@sk-web-gui/forms';
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
  pageSizes?: number[];
  page?: number;
  pages?: number;
  captionTitle?: string;
  captionBody?: string;
  summary?: string;
  highlightedItemIndex?: number;
  changePage?: (page: number) => void;
  BottomComponent?: JSX.Element;
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
    pageSize: _pageSize = 5,
    pageSizes: _pageSizes = [],
    page = 1,
    pages: _pages,
    captionTitle,
    captionBody,
    summary,
    highlightedItemIndex,
    changePage,
    BottomComponent,
    ...rest
  } = props;

  const zebraTableClasses = useZebraTableClass();
  const [managedRows, setManagedRows] = useState(rows);
  const [sortModeAscending, setSortModeAscending] = useState(defaultSort.sortMode);
  const [pageSizes, setPageSizes] = useState<number[]>(_pageSizes);
  const [pageSize, setPageSize] = useState<number>(pageSizes[0] || _pageSize);
  const [sortIndex, setSortIndex] = useState<number>(defaultSort.idx);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [pages, setPages] = useState<number>(Math.ceil(_pages || rows.length / pageSize));

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
    if (_pageSizes.length) {
      setPageSizes(_pageSizes);
      if (_pageSizes?.length > 0 && !_pageSizes.includes(pageSize)) {
        setPageSize(_pageSizes[0]);
      }
    }
  }, [_pageSizes]);

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
      {managedRows.length > 0 && (
        <table ref={ref} {...rest} className={zebraTableClasses} summary={summary ?? summary}>
          {captionTitle && (
            <caption className="text-left">
              {captionTitle}, sida {currentPage} av {pages}.
              {captionBody && (
                <>
                  <br />
                  <small>{captionBody}</small>
                </>
              )}
            </caption>
          )}

          <thead className="sk-zebratable-thead">
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
      {(pages > 1 || pageSizes?.length > 1 || BottomComponent) && (
        <div className="sk-zebratable-bottomwrapper">
          {(pages > 1 || pageSizes?.length > 1) && (
            <div className="sk-zebratable-paginationwrapper">
              <Pagination
                className="sk-zebratable-paginationwrapper"
                pages={pages}
                activePage={currentPage}
                changePage={(page: number) => setCurrentPage(page)}
              />
              {pageSizes.length > 0 && (
                <FormControl className="sk-zebratable-pagination-pagesizes">
                  <FormLabel className="sk-zebratable-pagination-pagesizes-label">Visa per sida:</FormLabel>
                  <div className="sk-zebratable-pagination-pagesizes-select">
                    <Select
                      size="sm"
                      onChange={(value) => setPageSize(value.data)}
                      value={{ label: pageSize.toString(), data: pageSize }}
                    >
                      {pageSizes?.map((size, sizeIndex) => (
                        <Select.Option
                          key={`pageSize-${sizeIndex}-${size}`}
                          value={{ label: size.toString(), data: size }}
                        >
                          {size}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </FormControl>
              )}
            </div>
          )}

          {BottomComponent && BottomComponent}
        </div>
      )}
    </>
  );
});

if (__DEV__) {
  ZebraTable.displayName = 'ZebraTable';
}

export default ZebraTable;
