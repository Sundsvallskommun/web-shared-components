import React from 'react';
import { cx } from '@sk-web-gui/utils';

export interface AlertContentDescriptionProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode;
}

export const AlertContentDescription = React.forwardRef<HTMLDivElement, AlertContentDescriptionProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div ref={ref} className={cx('sk-alert-content-description', className)} {...rest}>
      {children}
    </div>
  );
});
