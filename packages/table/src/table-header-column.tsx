import { cx } from '@sk-web-gui/utils';
import { useElementSize } from 'usehooks-ts';

import React from 'react';

interface TableHeaderColumnProps extends React.ComponentPropsWithoutRef<'th'> {
  sticky?: boolean;
}

export const TableHeaderColumn = React.forwardRef<HTMLTableCellElement, TableHeaderColumnProps>((props, ref) => {
  const { className, children, sticky, ...rest } = props;
  const [innerRef, { width }] = useElementSize();

  return (
    <th ref={ref} className={'sk-table-th'} data-sticky={sticky} {...rest}>
      {sticky && (
        <span className="sk-table-sticky-col" style={{ width: `${width}px` }}>
          <span className={cx('sk-table-col-content', className)}>{children}</span>
        </span>
      )}
      <span ref={innerRef} className={cx('sk-table-col-content', className)} aria-hidden={sticky}>
        {children}
      </span>
    </th>
  );
});
