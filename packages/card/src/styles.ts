import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useCardClass = createMemoClass((props) => {
  const classes = cx('card');

  return classes;
});
