import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const usePaginationClass = createMemoClass((props) => {
  const classes = cx('sk-pagination', props.fitContainer ? 'fit-content' : '');

  return classes;
});
