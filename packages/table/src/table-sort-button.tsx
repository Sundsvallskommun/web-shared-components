import { Icon } from '@sk-web-gui/icon';
import { DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { SortMode } from './auto-table';

export interface ITableSortButtonProps extends DefaultProps, React.ComponentPropsWithoutRef<'button'> {
  isActive: boolean;
  sortOrder: SortMode.ASC | SortMode.DESC | null;
}

export const TableSortButton = React.forwardRef<HTMLButtonElement, ITableSortButtonProps>((props, ref) => {
  const { sortOrder, children, isActive, ...rest } = props;
  return (
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
  );
});
