import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { TableFooter } from './table-footer';
import { TableHeader } from './table-header';
import { TableHeaderColumn } from './table-header-column';
import { TableRowColumn } from './table-row-column';

export interface TableComponentProps extends DefaultProps, React.ComponentPropsWithRef<'table'> {
  background?: 'show' | 'hide';
  dense?: boolean;
}

export const TableComponent = React.forwardRef<HTMLTableElement, TableComponentProps>((props, ref) => {
  const { background = 'hide', dense = false, className, children, ...rest } = props;

  //MANUEL TABLE
  const validChildren = getValidChildren(children);
  const tableItems = validChildren
    .filter((child) => child.type !== TableFooter)
    .map((child, index) => {
      let props;
      if (child.type === TableHeader) {
        props = { ...child.props, background: background };
      } else if (child.type === TableHeaderColumn || child.type === TableRowColumn) {
        props = { ...child.props, rowindex: index };
      } else {
        props = { ...child.props };
      }

      return React.cloneElement(child, props);
    });

  const footerItem = validChildren.filter((child) => child.type === TableFooter);
  return (
    <div
      className={cx('sk-table-wrapper', className)}
      data-footer={validChildren.find((child) => child.type === TableFooter) ? true : false}
      data-background={background === 'show' ? true : false}
    >
      <div className="sk-table-wrapper-inside">
        <table ref={ref} data-dense={dense ? 'dense' : 'normal'} {...rest} className={'sk-table'}>
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
