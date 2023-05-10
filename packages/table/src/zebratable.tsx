import { cx, __DEV__ } from '@sk-web-gui/utils';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useZebraTableClass } from './styles';
import { Pagination } from '@sk-web-gui/pagination';
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
    pageSize = 5,
    page = 1,
    pages = Math.ceil(rows.length / pageSize),
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
  const [sortIndex, setSortIndex] = useState<number>(defaultSort.idx);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [currentPages, setPages] = useState<number>(pages);

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
      setPages(Math.ceil(rows.length / pageSize));
      const startIndex = currentPage * pageSize - pageSize;
      setManagedRows(rows.slice(startIndex, startIndex + pageSize));
    } else {
      setManagedRows(rows);
    }
  }, [pageSize, currentPage, rows, pages]);

  return (
    <>
      {managedRows.length > 0 && (
        <table
          ref={ref}
          {...rest}
          className={zebraTableClasses}
          aria-label={`${rows.length} rader på ${currentPages} sidor`}
          summary={summary ?? summary}
        >
          {captionTitle && (
            <caption className="sr-only">
              {captionTitle}

              {captionBody && (
                <>
                  <br />
                  <span>{captionBody}</span>
                </>
              )}
            </caption>
          )}

          <thead className="zebratable-thead">
            <tr className={cx(`zebratable-thead-tr`)}>
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
          <tbody className="zebratable-tbody">
            {managedRows.map((cols, idx) => (
              <tr
                key={`row${idx}`}
                className={`zebratable-tbody-tr ${
                  highlightedItemIndex !== undefined &&
                  highlightedItemIndex % pageSize === idx &&
                  highlightedPage === currentPage
                    ? `highlighted`
                    : ``
                }`}
              >
                {cols.map(({ element, isShown = true }, idx) =>
                  isShown ? (
                    <td key={`col${idx}`} className="zebratable-tbody-td">
                      {element}
                    </td>
                  ) : null
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {(pages > 1 || BottomComponent) && (
        <div className="zebratable-bottomwrapper">
          {pages > 1 && (
            <div className="zebratable-paginationwrapper">
              <Pagination
                pages={currentPages}
                activePage={currentPage}
                changePage={(page: number) => setCurrentPage(page)}
              />
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
