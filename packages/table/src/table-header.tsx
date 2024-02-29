import React from 'react';
import { cx, getValidChildren } from '@sk-web-gui/utils';

export const TableHeader = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<'tr'>>((props, ref) => {
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
