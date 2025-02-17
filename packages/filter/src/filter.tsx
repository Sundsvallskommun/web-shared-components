import { Checkbox } from '@sk-web-gui/forms';
import { __DEV__, cx, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { FilterItem } from './filter-item';
import { FilterLabel } from './filter-label';

export interface FilterRootProps extends DefaultProps, React.ComponentPropsWithRef<'fieldset'> {}

interface FilterTypes {
  filterCheckboxes: React.JSX.Element[];
  filterLabel?: React.JSX.Element;
}

export const FilterRoot = React.forwardRef<HTMLFieldSetElement, FilterRootProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const { filterCheckboxes, filterLabel } = React.Children.toArray(children).reduce<FilterTypes>(
    (object, child) => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        switch (child?.type?.name) {
          case FilterItem.name:
            object.filterCheckboxes.push(child);
            break;
          case FilterLabel.name:
            object.filterLabel = child;
            break;
        }
      }
      return object;
    },
    { filterCheckboxes: [], filterLabel: undefined }
  );

  return (
    <fieldset className={cx('sk-filter', className)} ref={ref} {...rest}>
      {filterLabel && filterLabel}
      {filterCheckboxes.length && <Checkbox.Group>{filterCheckboxes}</Checkbox.Group>}
    </fieldset>
  );
});

if (__DEV__) {
  FilterRoot.displayName = 'FilterRoot';
}

export default FilterRoot;
