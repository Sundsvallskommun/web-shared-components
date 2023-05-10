import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useCalendarClass = createMemoClass((props) => {
  const classes = cx('calendar');

  return classes;
});
