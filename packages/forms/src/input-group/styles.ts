import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useInputGroupClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-input-group-inner-sm',
    md: 'sk-form-input-group-inner-md',
    lg: 'sk-form-input-group-inner-lg',
  };

  const classes = cx('sk-form-input-group-inner', sizes[props?.size ?? 'md']);

  return classes;
});
