import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useProgressBarClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-progress-bar-sm',
    md: 'sk-progress-bar-md',
  };

  return cx('sk-progress-bar', sizes[props?.size ?? 'sm']);
});
