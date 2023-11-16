import { Checkbox, CheckboxItemProps } from '@sk-web-gui/forms';
import { cx } from '@sk-web-gui/utils';
import React from 'react';

interface IFilterItemProps extends CheckboxItemProps {
  children: JSX.Element;
}

export interface FilterItemProps extends IFilterItemProps {}

export const FilterItem: React.FC<CheckboxItemProps> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <Checkbox className={cx('sk-filter-item', className)} role="none" {...rest}>
      {children}
    </Checkbox>
  );
};
