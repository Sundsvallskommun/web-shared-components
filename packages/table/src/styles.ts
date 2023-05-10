import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useZebraTableClass = createMemoClass((props) => {
  const classes = cx('zebratable');

  return classes;
});
