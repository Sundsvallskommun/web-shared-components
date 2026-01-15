import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useTextareGroupClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-input-textarea-group-inner-sm',
    md: 'sk-form-input-textarea-group-inner-md',
    lg: 'sk-form-input-textarea-group-inner-lg',
  };

  const classes = cx('sk-form-input-textarea-group-inner', sizes[props?.size ?? 'md']);

  return classes;
});
