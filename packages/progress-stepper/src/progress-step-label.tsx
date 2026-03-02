import React from 'react';
import { cx } from '@sk-web-gui/utils';

export interface ProgressStepLabelProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode;
}

export const ProgressStepLabel = React.forwardRef<HTMLDivElement, ProgressStepLabelProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div ref={ref} className={cx('sk-progress-stepper-step-label', className)} {...rest}>
      {children}
    </div>
  );
});
