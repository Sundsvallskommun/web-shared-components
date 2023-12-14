import React from 'react';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';

export interface DividerProps extends DefaultProps, React.ComponentPropsWithRef<'hr'> {
  /*The orientation */
  orientation?: 'horizontal' | 'vertical';
  /* Thicker divider */
  strong?: boolean;
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className, strong, ...props }, ref) => {
    const classes = cx(
      'sk-divider',
      orientation === 'vertical' ? 'sk-divider-vertical' : 'sk-divider-horizontal',
      className
    );
    return <hr ref={ref} aria-orientation={orientation} className={classes} {...props} data-strong={strong} />;
  }
);

if (__DEV__) {
  Divider.displayName = 'Divider';
}

export default Divider;
