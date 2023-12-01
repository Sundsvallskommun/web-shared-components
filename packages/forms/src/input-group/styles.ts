import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useInputGroupClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-input-group-sm',
    md: 'sk-form-input-group-md',
    lg: 'sk-form-input-group-lg',
  };

  const classes = cx('sk-form-input-group', sizes[props.size]);

  return classes;
});
