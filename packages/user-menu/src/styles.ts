import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useUserMenuClass = createMemoClass((props) => {
  const classes = cx('usermenu');

  return classes;
});
