import { ZebraTableHeader } from './zebratable';
import { cx } from '@sk-web-gui/utils';
import * as React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ZTableHeaderProps extends ZebraTableHeader {
  sortIndex: number;
  sortModeAscending: boolean;
  tableSortable: boolean;
  index: number;
  handleSort: (index: number) => void;
}

export const ZTableHeader: React.FC<ZTableHeaderProps> = ({
  element,
  isColumnSortable = true,
  isShown = true,
  screenReaderOnly,
  sortIndex,
  sortModeAscending,
  tableSortable,
  index,
  handleSort,
}) => {
  return isShown ? (
    <>
      <th
        scope="col"
        aria-sort={`${sortIndex == index ? (sortModeAscending ? 'ascending' : 'descending') : 'none'}`}
        data-iscolumnsortable={isColumnSortable}
        className="sk-zebratable-thead-th"
      >
        {isColumnSortable ? (
          <>
            <button
              aria-description={sortIndex == index ? undefined : 'sortera'}
              className="sk-zebratable-sortbutton"
              onClick={() => {
                tableSortable && isColumnSortable && handleSort(index);
              }}
            >
              {element}
              <div className="sk-zebratable-sortbutton-icon">
                {tableSortable && isColumnSortable && (
                  <span
                    className="sk-zebratable-sortbutton-icon-sort"
                    data-sortmodeascending={index === sortIndex ? sortModeAscending : undefined}
                  >
                    <ChevronUp />
                    <ChevronDown />
                  </span>
                )}
              </div>
            </button>
          </>
        ) : (
          <span className={cx(`${screenReaderOnly ? `sr-only` : ``}`)}>{element.props.children}</span>
        )}
      </th>
    </>
  ) : (
    <></>
  );
};
