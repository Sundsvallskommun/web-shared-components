import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const usePaginationClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'pagination-sm',
    md: 'pagination-md',
    lg: 'pagination-lg',
  };

  const classes = cx('pagination', props.fitContainer ? 'fit-content' : '', sizes[props.size]);

  return classes;
});
