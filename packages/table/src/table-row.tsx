import React from 'react';
import { DefaultProps, cx, getValidChildren } from '@sk-web-gui/utils';

interface ITableRowProps extends DefaultProps {
  children: JSX.Element | JSX.Element[] | string;
}

export interface TableRowProps
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, 'color' | 'children'>,
    ITableRowProps {}

export const TableRow = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<'tr'>>((props, ref) => {
  const { children, className, ...rest } = props;
  const validChildren = getValidChildren(children);
  const rowItems = validChildren.map((child, index) => {
    const props = { ...child.props, rowindex: index };

    return React.cloneElement(child, props);
  });
  return (
    <tr ref={ref} className={cx('sk-table-tbody-tr', className)} {...rest}>
      {rowItems}
    </tr>
  );
});
