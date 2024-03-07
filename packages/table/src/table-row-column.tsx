import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { useElementSize } from 'usehooks-ts';

interface TableRowColumnProps extends React.ComponentPropsWithoutRef<'td'> {
  sticky?: boolean;
}

export const TableRowColumn = React.forwardRef<HTMLTableCellElement, TableRowColumnProps>((props, ref) => {
  const { children, className, sticky, ...rest } = props;
  const [innerRef, { width }] = useElementSize();

  return (
    <td ref={ref} className="sk-table-tbody-td" data-sticky={sticky} {...rest}>
      {sticky && (
        <span className={cx('sk-table-sticky-col', className)} style={{ width: `${width}px` }}>
          <span className={cx('sk-table-col-content', className)}>{children}</span>
        </span>
      )}
      <span ref={innerRef} className={cx('sk-table-col-content', className)} aria-hidden={sticky}>
        {children}
      </span>
    </td>
  );
});
