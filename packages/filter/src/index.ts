import { FilterRootProps, FilterRoot } from './filter';
import { FilterItem } from './filter-item';
import { FilterLabel } from './filter-label';

interface FilterProps extends React.ForwardRefExoticComponent<FilterRootProps> {
  Component: typeof FilterRoot;
  Label: typeof FilterLabel;
  Item: typeof FilterItem;
}

export const Filter = {
  ...FilterRoot,
  Component: FilterRoot,
  Label: FilterLabel,
  Item: FilterItem,
} as FilterProps;

export type { FilterProps };
export default Filter;
