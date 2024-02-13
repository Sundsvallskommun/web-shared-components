import React from 'react';
import { DefaultProps, cx, getValidChildren } from '@sk-web-gui/utils';

interface ITableHeaderProps extends DefaultProps {
  children: JSX.Element | JSX.Element[] | string;
}

export interface TableHeaderProps
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, 'color' | 'children'>,
    ITableHeaderProps {}

export const TableHeader = React.forwardRef<HTMLTableRowElement, TableHeaderProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const validChildren = getValidChildren(children);
  const headerItems = validChildren.map((child, index) => {
    const props = { ...child.props, rowindex: index };

    return React.cloneElement(child, props);
  });

  return (
    <thead className="sk-table-thead">
      <tr ref={ref} className={cx(`sk-table-thead-tr`, className)} {...rest}>
        {headerItems}
      </tr>
    </thead>
  );
});
