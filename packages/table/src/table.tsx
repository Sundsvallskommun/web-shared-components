import { DefaultProps, __DEV__, cx, getValidChildren, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { useResizeObserver } from 'usehooks-ts';
import { TableFooter } from './table-footer';
import { TableHeader, TableHeaderProps } from './table-header';
export interface TableComponentProps extends DefaultProps, React.ComponentPropsWithRef<'table'> {
  background?: boolean;
  wrappingBorder?: boolean;
  dense?: boolean;
  scrollable?: 'x' | 'y' | boolean;
}

export const TableComponent = React.forwardRef<HTMLTableElement, TableComponentProps>((props, ref) => {
  const {
    background = false,
    wrappingBorder = background,
    dense = false,
    className,
    children,
    scrollable = true,
    ...rest
  } = props;
  const sizeRef = React.useRef<HTMLDivElement>(null);
  const { width: tableWidth } = useResizeObserver<HTMLDivElement>({
    //NOTE: Cast to RefObject<HTMLDivElement> to avoid type error because of bug in usehooks-ts
    //Remove this when the bug is fixed
    ref: sizeRef as React.RefObject<HTMLDivElement>,
  });
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const { width: wrapperWidth } = useResizeObserver<HTMLDivElement>({
    //NOTE: Cast to RefObject<HTMLDivElement> to avoid type error because of bug in usehooks-ts
    //Remove this when the bug is fixed
    ref: wrapperRef as React.RefObject<HTMLDivElement>,
  });
  const [hasScroll, setHasScroll] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (wrapperWidth && tableWidth) {
      setHasScroll(wrapperWidth < tableWidth);
    }
  }, [tableWidth, wrapperWidth]);

  const validChildren = getValidChildren(children);
  const tableItems = validChildren
    .filter((child) => child.type !== TableFooter)
    .map((child) => {
      if (child.type === TableHeader && React.isValidElement<TableHeaderProps>(child)) {
        return React.cloneElement(child, { ...child.props, background: background });
      } else {
        return child;
      }
    });

  const footerItem = validChildren.filter((child) => child.type === TableFooter);
  return (
    <div
      className={cx('sk-table-wrapper', className)}
      data-footer={!!footerItem}
      data-background={background}
      data-wrappingborder={wrappingBorder}
    >
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
