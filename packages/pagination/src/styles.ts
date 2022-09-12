import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const usePaginationClass = createMemoClass((props) => {
  const sizes = {
    sm: 'pagination-sm',
    md: 'pagination-md',
    lg: 'pagination-lg',
  };

  const classes = cx('pagination', sizes[props.size]);

  return classes;
});
