import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useInputClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-input-sm',
    md: 'sk-input-md',
    lg: 'sk-input-lg',
  };

  const classes = cx('sk-input', sizes[props.size], props.disabled && 'sk-input-disabled');

  return classes;
});
