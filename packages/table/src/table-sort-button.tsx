import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { sortMode } from './table';

interface ITableSortButtonProps extends DefaultProps {
  children: JSX.Element | JSX.Element[] | string;
  isActive: boolean;
  sortOrder: sortMode.ASC | sortMode.DESC | null;
  isColumnSortable: boolean;
  screenReaderOnly: boolean;
}

export interface TableSortButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'color' | 'children'>,
    ITableSortButtonProps {}

export const TableSortButton = React.forwardRef<HTMLButtonElement, TableSortButtonProps>((props, ref) => {
  const { sortOrder, children, isActive, isColumnSortable, screenReaderOnly, ...rest } = props;
  console.log(isColumnSortable);
  return isColumnSortable ? (
    <button ref={ref} {...rest} className="sk-table-sortbutton">
      {children}
      <div className="sk-table-sortbutton-icon">
        {isActive ? (
          <span className="sk-table-sortbutton-icon-sort" data-sortmode={isActive ? sortOrder : undefined}>
            <Icon name="chevron-up" size="fit" />
            <Icon name="chevron-down" size="fit" />
          </span>
        ) : (
          <span className="sk-table-sortbutton-icon-sort">
            <Icon name="chevron-up" size="fit" />
            <Icon name="chevron-down" size="fit" />
          </span>
        )}
      </div>
    </button>
  ) : (
    <span ref={ref} {...rest} className={cx('sk-table-sortbutton', `${screenReaderOnly ? `sr-only` : ``}`)}>
      {children}
    </span>
  );
});
