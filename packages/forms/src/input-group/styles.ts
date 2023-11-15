import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useInputGroupClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-input-group-sm',
    md: 'sk-input-group-md',
    lg: 'sk-input-group-lg',
  };

  const classes = cx('sk-input-group', sizes[props.size]);

  return classes;
});
