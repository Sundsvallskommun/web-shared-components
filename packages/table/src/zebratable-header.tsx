import { ZebraTableHeader } from './zebratable';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { cx } from '@sk-web-gui/utils';
import * as React from 'react';

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
        className="zebratable-thead-th"
      >
        {isColumnSortable ? (
          <>
            <span className="sr-only">{element.props.children}</span>
            <button
              className="zebratable-sortbutton"
              aria-label={`Sortera efter ${element.props.children} i ${
                sortModeAscending ? 'stigande' : 'fallande'
              } ordning`}
              onClick={() => {
                tableSortable && isColumnSortable && handleSort(index);
              }}
            >
              {element}
              <div className="zebratable-sortbutton-icon">
                {tableSortable &&
                  isColumnSortable &&
                  (index === sortIndex ? (
                    <ChevronRightOutlinedIcon
                      className="zebratable-sortbutton-icon-sort"
                      data-sortmodeascending={sortModeAscending}
                    />
                  ) : (
                    <UnfoldMoreOutlinedIcon className="zebratable-sortbutton-icon-more" />
                  ))}
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
