import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

export interface TabsContentProps extends React.ComponentPropsWithRef<'div'> {
  selected?: boolean;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>((props, ref) => {
  const { className, children, selected, ...rest } = props;

  return (
    <div
      role="tabpanel"
      ref={ref}
      className={cx('sk-tabs-content', className)}
      data-selected={selected ? 'true' : undefined}
      {...rest}
    >
      {children}
    </div>
  );
});

if (__DEV__) {
  TabsContent.displayName = 'TabsContent';
}
