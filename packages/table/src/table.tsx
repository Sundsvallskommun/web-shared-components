import { DefaultProps, __DEV__, cx, getValidChildren, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { TableFooter } from './table-footer';
import { TableHeader } from './table-header';
import { useElementSize } from 'usehooks-ts';
export interface TableComponentProps extends DefaultProps, React.ComponentPropsWithRef<'table'> {
  background?: boolean;
  dense?: boolean;
  scrollable?: 'x' | 'y' | boolean;
}

export const TableComponent = React.forwardRef<HTMLTableElement, TableComponentProps>((props, ref) => {
  const { background = false, dense = false, className, children, scrollable = true, ...rest } = props;
  const [sizeRef, { width: tableWidth }] = useElementSize();
  const [wrapperRef, { width: wrapperWidth }] = useElementSize();
  const [hasScroll, setHasScroll] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasScroll(wrapperWidth < tableWidth);
  }, [tableWidth, wrapperWidth]);

  const validChildren = getValidChildren(children);
  const tableItems = validChildren
    .filter((child) => child.type !== TableFooter)
    .map((child) => {
      let props;
      if (child.type === TableHeader) {
        props = { ...child.props, background: background };
      } else {
        props = { ...child.props };
      }

      return React.cloneElement(child, props);
    });

  const footerItem = validChildren.filter((child) => child.type === TableFooter);
  return (
    <div className={cx('sk-table-wrapper', className)} data-footer={!!footerItem} data-background={background}>
      <div ref={wrapperRef} className="sk-table-wrapper-inside" data-scroll={scrollable}>
        <table
          ref={useForkRef(sizeRef, ref)}
          data-dense={dense ? 'dense' : 'normal'}
          {...rest}
          data-hasscroll={hasScroll}
          className={'sk-table'}
        >
          {tableItems}
        </table>
      </div>
      {footerItem}
    </div>
  );
});

if (__DEV__) {
  TableComponent.displayName = 'Table';
}

export default TableComponent;
