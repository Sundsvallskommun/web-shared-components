import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useSwitchBoxClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'form-switch-box-sm',
    md: 'form-switch-box-md',
    lg: 'form-switch-box-lg',
    xl: 'form-switch-box-xl',
  };

  const classes = cx('form-switch-box', sizes[props.size]);

  return classes;
});

export const useSwitchClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'form-switch-sm',
    md: 'form-switch-md',
    lg: 'form-switch-lg',
    xl: 'form-switch-xl',
  };

  const classes = cx('form-switch', sizes[props.size], props.disabled && 'form-switch-disabled');

  return classes;
});
