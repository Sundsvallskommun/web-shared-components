import { cx, __DEV__ } from '@sk-web-gui/utils';
import { DefaultProps } from '@sk-web-gui/utils';
import * as React from 'react';

interface IDividerProps extends DefaultProps {
  /*The orientation */
  orientation?: 'horizontal' | 'vertical';
  /* Thicker divider */
  strong?: boolean;
}

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement>, IDividerProps {}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className, strong, ...props }, ref) => {
    const classes = cx('divider', orientation === 'vertical' ? 'divider-vertical' : 'divider-horizontal', className);

    return <hr ref={ref} aria-orientation={orientation} className={classes} {...props} data-strong={strong} />;
  }
);

if (__DEV__) {
  Divider.displayName = 'Divider';
}

export default Divider;
