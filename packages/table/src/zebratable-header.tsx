import { ZebraTableHeader } from './zebratable';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { Icon } from '@sk-web-gui/icon';

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
        data-iscolumnsortable={tableSortable && isColumnSortable}
        className="sk-zebratable-thead-th"
      >
        {tableSortable && isColumnSortable ? (
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
                    <Icon name="chevron-up" size="fit" />
                    <Icon name="chevron-down" size="fit" />
                  </span>
                )}
              </div>
            </button>
          </>
        ) : (
          <span className={cx('sk-zebratable-sortbutton', `${screenReaderOnly ? `sr-only` : ``}`)}>
            {element.props.children}
          </span>
        )}
      </th>
    </>
  ) : (
    <></>
  );
};
