import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useDropdownFilterClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'form-field-sm',
    md: 'form-field-md',
    lg: 'form-field-lg',
  };

  const classes = cx('dropdown-filter', sizes[props.size]);

  return classes;
});

export const useFilterItemClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'form-field-sm',
    md: 'form-field-md',
    lg: 'form-field-lg',
  };

  const classes = cx('filter-item', sizes[props.size], props.disabled ? 'disabled' : '');

  return classes;
});
