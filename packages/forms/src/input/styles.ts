import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useInputClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-input-sm',
    md: 'sk-form-input-md',
    lg: 'sk-form-input-lg',
  };

  const classes = cx('sk-form-input', sizes[props?.size ?? 'md'], props.disabled && 'sk-form-input-disabled');

  return classes;
});
