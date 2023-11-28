import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';

interface IFilterLabelProps extends DefaultProps {
  children: JSX.Element | string;
}

export interface FilterLabelProps
  extends Omit<React.HTMLAttributes<HTMLLegendElement>, 'color' | 'children' | 'onClick'>,
    IFilterLabelProps {}

export const FilterLabel = React.forwardRef<HTMLLegendElement, FilterLabelProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <legend ref={ref} className={cx('sk-filter-label', className)} {...rest}>
      {children}
    </legend>
  );
});
