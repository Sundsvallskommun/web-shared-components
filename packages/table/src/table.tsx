import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { TableFooter } from './table-footer';

interface UseTableProps {
  summary?: string;
  background?: boolean;
}

export interface TableComponentProps
  extends DefaultProps,
    UseTableProps,
    Omit<React.ComponentPropsWithRef<'table'>, 'color'> {}

export const TableComponent = React.forwardRef<HTMLTableElement, TableComponentProps>((props, ref) => {
  const { summary, background = false, className, children, ...rest } = props;

  //MANUEL TABLE
  const validChildren = getValidChildren(children);
  const tableItems = validChildren
    .filter((child) => child.type !== TableFooter)
    .map((child, index) => {
      const props = { ...child.props, rowindex: index };

      return React.cloneElement(child, props);
    });

  const footerItem = validChildren.filter((child) => child.type === TableFooter);
  return (
    <div className={cx('sk-table-wrapper', className)} data-background={background}>
      <div className="sk-table-wrapper-inside">
        <table ref={ref} {...rest} className={'sk-table'} summary={summary ? summary : undefined}>
          {tableItems}
        </table>
        {footerItem}
      </div>
    </div>
  );
});

if (__DEV__) {
  TableComponent.displayName = 'Table';
}

export default TableComponent;
