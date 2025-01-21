import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useDividerClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-divider-sm',
    md: 'sk-divider-md',
    lg: 'sk-divider-lg',
  };

  const classes = cx('sk-divider', sizes[props?.size ?? 'md']);

  return classes;
});
