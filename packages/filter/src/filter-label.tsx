import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

export interface FilterLabelProps
  extends DefaultProps,
    Omit<React.ComponentPropsWithRef<'legend'>, 'color' | 'children' | 'onClick'> {
  children: JSX.Element | string;
}

export const FilterLabel = React.forwardRef<HTMLLegendElement, FilterLabelProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <legend ref={ref} className={cx('sk-filter-label', className)} {...rest}>
      {children}
    </legend>
  );
});

if (__DEV__) {
  FilterLabel.displayName = 'FilterLabel';
}

export default FilterLabel;
