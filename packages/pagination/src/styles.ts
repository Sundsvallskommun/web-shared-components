import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const usePaginationClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-pagination-sm',
    md: 'sk-pagination-md',
    lg: 'sk-pagination-lg',
  };

  const classes = cx('sk-pagination', props.fitContainer ? 'fit-content' : '', sizes[props.size]);

  return classes;
});
