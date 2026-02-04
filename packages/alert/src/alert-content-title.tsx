import React from 'react';
import { cx } from '@sk-web-gui/utils';

export interface AlertContentTitleProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode;
}

export const AlertContentTitle = React.forwardRef<HTMLDivElement, AlertContentTitleProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div ref={ref} className={cx('sk-alert-content-title', className)} {...rest}>
      {children}
    </div>
  );
});
