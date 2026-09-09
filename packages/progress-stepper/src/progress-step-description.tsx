import React from 'react';
import { cx } from '@sk-web-gui/utils';

export interface ProgressStepLabelProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode;
}

export const ProgressStepDescription = React.forwardRef<HTMLDivElement, ProgressStepLabelProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div ref={ref} className={cx('sk-progress-stepper-step-description', className)} {...rest}>
      {children}
    </div>
  );
});
