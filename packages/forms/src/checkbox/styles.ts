import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useCheckboxLabelClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-checkbox-label-sm',
    md: 'sk-form-checkbox-label-md',
    lg: 'sk-form-checkbox-label-lg',
  };

  const classes = cx('sk-form-checkbox-label', sizes[props.size]);

  return classes;
});

export const useCheckboxClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-checkbox-sm',
    md: 'sk-form-checkbox-md',
    lg: 'sk-form-checkbox-lg',
  };

  const classes = cx('sk-form-checkbox', props.disabled && 'sk-form-checkbox-disabled', sizes[props.size]);

  return classes;
});
