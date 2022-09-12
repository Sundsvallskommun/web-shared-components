import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useCheckboxLabelClass = createMemoClass((props) => {
  const sizes = {
    sm: 'form-checkbox-label-sm',
    md: 'form-checkbox-label-md',
    lg: 'form-checkbox-label-lg',
  };

  const classes = cx('form-checkbox-label', sizes[props.size]);

  return classes;
});

export const useCheckboxClass = createMemoClass((props) => {
  const sizes = {
    sm: 'form-checkbox-sm',
    md: 'form-checkbox-md',
    lg: 'form-checkbox-lg',
  };

  const classes = cx('form-checkbox', props.disabled && 'form-checkbox-disabled', sizes[props.size]);

  return classes;
});
