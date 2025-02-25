import React from 'react';
import { cx, getValidChildren } from '@sk-web-gui/utils';

export const TableRow = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<'tr'>>((props, ref) => {
  const { children, className, ...rest } = props;
  const validChildren = getValidChildren<Record<string, unknown>>(children);
  const rowItems = validChildren.map((child) => {
    const props = { ...child.props };

    return React.cloneElement(child, props);
  });

  return (
    <tr ref={ref} className={cx('sk-table-tbody-tr', className)} {...rest}>
      {rowItems}
    </tr>
  );
});
