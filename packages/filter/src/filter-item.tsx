import { Checkbox, CheckboxProps } from '@sk-web-gui/forms';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

export interface FilterItemProps extends DefaultProps, React.ComponentProps<CheckboxProps['Component']> {
  children: JSX.Element;
}

export const FilterItem = React.forwardRef<HTMLInputElement, Omit<FilterItemProps, 'ref'>>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <Checkbox ref={ref} className={cx('sk-filter-item', className)} role="none" {...rest}>
      {children}
    </Checkbox>
  );
});

if (__DEV__) {
  FilterItem.displayName = 'FilterItem';
}

export default FilterItem;
