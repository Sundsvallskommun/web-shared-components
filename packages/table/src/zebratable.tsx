import { cx, __DEV__ } from "@sk-web-gui/utils";
import { useEffect, useState } from "react";
import * as React from "react";
import { useZebraTableClass } from "./styles";
import { Pagination } from "@sk-web-gui/pagination";
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';

export interface ZebraTableHeader {
  element: JSX.Element;
  isColumnSortable: boolean;
  isShown: boolean;
  screenReaderOnly?: boolean;
}
export interface ZebraTableColumn {
  element: JSX.Element;
  isShown: boolean;
}

export interface IZebraTableProps {
  headers: ZebraTableHeader[];
  rows: ZebraTableColumn[][];
  tableSortable?: boolean;
  sortHandler?: (idx: number, sortMode: boolean) => void;
  sortAscending?: boolean;
  pageSize?: number;
  page?: number;
  pages?: number;
  captionTitle?: string;
  captionBody?: string;
  summary?: string;
  highlightedItemIndex?: any;
  changePage?: (page: number) => void;
  BottomComponent?: JSX.Element;
}

export type ZebraTableProps = IZebraTableProps &
  React.HTMLAttributes<HTMLTableElement>;

export const ZebraTable = React.forwardRef<HTMLTableElement, ZebraTableProps>(
  (props, ref) => {
    const {
      headers,
      rows,
      tableSortable = true,
      sortHandler = () => {},
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
    const [sortModeAscending, setSortModeAscending] = useState(sortAscending);
    const [sortIndex, setSortIndex] = useState<number>(0);
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
      setCurrentPage(page);
    }, [page]);

    useEffect(() => {
      changePage && changePage(currentPage);
    }, [currentPage]);

    useEffect(() => {
      if (highlightedItemIndex !== undefined) {
        let itemPage = Math.floor((highlightedItemIndex / pageSize) + 1);
        setHighlightedPage(itemPage);
        setCurrentPage(itemPage);
      }
    }, [highlightedItemIndex])

    useEffect(() => {
      setPages(Math.ceil(rows.length / pageSize))
      let startIndex = (currentPage * pageSize) - pageSize;
      setManagedRows(rows.slice(startIndex, startIndex + pageSize));
    }, [pageSize, currentPage, rows, sortIndex, sortModeAscending]);
  
    return (
      <>
        {managedRows.length > 0 && (
          <table
            className={zebraTableClasses}
            aria-label={`${rows.length} rader på ${currentPages} sidor`}
            summary={summary ?? summary}
          >
            {captionTitle && 
              <caption className="sr-only">
                {captionTitle}
                
                {captionBody &&
                  <>
                    <br />
                    <span>
                      {captionBody}
                    </span>
                  </>
                }
              </caption>
            }
            
            <thead className="zebratable-thead">
              <tr className={cx(`zebratable-thead-tr`)}>
                {headers.map((h, idx) => {
                  return h.isShown ? (
                    <th
                      scope="col"
                      key={`header${idx}`}
                      aria-sort={`${sortIndex == idx ? (sortModeAscending ? "ascending" : "descending") : 'none'}`}
                      data-iscolumnsortable={h.isColumnSortable}
                      className="zebratable-thead-th"
                    >
                      
                      {h.isColumnSortable ? (
                        <>
                          <span className="sr-only">
                            {h.element.props.children}
                          </span>
                          <button
                            className="zebratable-sortbutton"
                            aria-label={`Sortera efter ${
                              h.element.props.children
                            } i ${
                              sortModeAscending ? "stigande" : "fallande"
                            } ordning`}
                            onClick={(e) => {
                              tableSortable &&
                                h.isColumnSortable &&
                                internalSortHandler(idx);
                            }}
                          >
                            {h.element}
                            <div className="zebratable-sortbutton-icon">
                              {tableSortable &&
                                h.isColumnSortable &&
                                (idx === sortIndex ? (
                                  <ChevronRightOutlinedIcon className='zebratable-sortbutton-icon-sort' data-sortmodeascending={sortModeAscending}/>
                                ) : (
                                  <UnfoldMoreOutlinedIcon className="zebratable-sortbutton-icon-more"/>
                              ))}

                            </div>
                            
                          </button>
                        </>
                      ) : 
                        <span
                        className={cx(`${h.screenReaderOnly ? `sr-only` : ``}`)}
                      >{h.element.props.children}</span>
                      }
                    </th>
                  ) : null;
                })}
              </tr>
            </thead>
            <tbody className="zebratable-tbody">
              {managedRows.map((cols, idx) => (
                <tr key={`row${idx}`} className={`zebratable-tbody-tr ${highlightedItemIndex !== undefined && (highlightedItemIndex % pageSize) === idx && highlightedPage === currentPage ? `highlighted` : ``}`}>
                  {cols.map((col, idx) =>
                    col.isShown ? (
                      <td key={`col${idx}`} className="zebratable-tbody-td">
                        {col.element}
                      </td>
                    ) : null
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className='zebratable-bottomwrapper'>
        {pages > 1 && (
          <div className="zebratable-paginationwrapper">
            <Pagination pages={currentPages} activePage={currentPage} changePage={(page: number) => setCurrentPage(page)} />
          </div>
        )}
        {BottomComponent && (
          BottomComponent
        )}
        </div>
      </>
    );
  }
);

if (__DEV__) {
  ZebraTable.displayName = "ZebraTable";
}
