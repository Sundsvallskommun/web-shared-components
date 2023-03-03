import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useInputGroupClass = createMemoClass((props) => {
  const sizes = {
    sm: 'form-input-group-sm',
    md: 'form-input-group-md',
    lg: 'form-input-group-lg',
  };

  const classes = cx('form-input-group', sizes[props.size]);

  return classes;
});
