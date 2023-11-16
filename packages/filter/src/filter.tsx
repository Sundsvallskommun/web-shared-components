import { Checkbox } from '@sk-web-gui/forms';
import { cx, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { FilterItem } from './filter-item';
import { FilterLabel } from './filter-label';

export interface FilterRootProps extends DefaultProps, React.HTMLAttributes<HTMLFieldSetElement> {}

interface FilterTypes {
  filterCheckboxes: JSX.Element[];
  filterLabel?: JSX.Element;
}

export const FilterRoot = React.forwardRef<HTMLFieldSetElement, FilterRootProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const { filterCheckboxes, filterLabel } = React.Children.toArray(children).reduce<FilterTypes>(
    (object, child: any) => {
      switch (child?.type?.name) {
        case FilterItem.name:
          object.filterCheckboxes.push(child);
          break;
        case FilterLabel.name:
          object.filterLabel = child;
          break;
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

export interface FilterProps
  extends FilterRootProps,
    React.ForwardRefExoticComponent<FilterRootProps & React.RefAttributes<HTMLElement>> {
  Label: typeof FilterLabel;
  Item: typeof FilterItem;
}

export const Filter = FilterRoot as FilterProps;

Filter.Item = FilterItem;
Filter.Label = FilterLabel;

export default Filter;
