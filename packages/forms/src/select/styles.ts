import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useSelectClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-select-sm',
    md: 'sk-form-select-md',
    lg: 'sk-form-select-lg',
  };

  const classes = cx('sk-form-select', sizes[props.size]);

  return classes;
});
