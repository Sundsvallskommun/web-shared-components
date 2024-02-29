import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { TableFooter } from './table-footer';

interface UseTableProps {
  background?: boolean;
}

export interface TableComponentProps extends DefaultProps, UseTableProps, React.ComponentPropsWithRef<'table'> {}

export const TableComponent = React.forwardRef<HTMLTableElement, TableComponentProps>((props, ref) => {
  const { background = false, className, children, ...rest } = props;

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
    <div
      className={cx('sk-table-wrapper', className)}
      data-footer={validChildren.find((child) => child.type === TableFooter) ? true : false}
      data-background={background}
    >
      <div className="sk-table-wrapper-inside">
        <table ref={ref} {...rest} className={'sk-table'}>
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
