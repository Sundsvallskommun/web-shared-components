import React from 'react';
import { cx, getValidChildren } from '@sk-web-gui/utils';

export interface TableHeaderProps extends React.ComponentPropsWithoutRef<'tr'> {
  background?: 'show' | 'hide';
}

export const TableHeader = React.forwardRef<HTMLTableRowElement, TableHeaderProps>((props, ref) => {
  const { className, children, background, ...rest } = props;

  const validChildren = getValidChildren(children);
  const headerItems = validChildren.map((child, index) => {
    const props = { ...child.props, rowindex: index };

    return React.cloneElement(child, props);
  });

  return (
    <thead className="sk-table-thead" data-background={background === 'show' ? true : false}>
      <tr ref={ref} className={cx(`sk-table-thead-tr`, className)} {...rest}>
        {headerItems}
      </tr>
    </thead>
  );
});
