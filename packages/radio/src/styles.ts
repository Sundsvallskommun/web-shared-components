import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useRadioButtonLabelClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-radio-label-sm',
    md: 'sk-form-radio-label-md',
    lg: 'sk-form-radio-label-lg',
  };

  const classes = cx('sk-form-radio-label', sizes[props.size]);

  return classes;
});

export const useRadioButtonClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-radio-sm',
    md: 'sk-form-radio-md',
    lg: 'sk-form-radio-lg',
  };

  const classes = cx('sk-form-radio', sizes[props.size], props.disabled && 'sk-form-radio-disabled');

  return classes;
});
export const useRadioButtonGroupClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-radio-group-sm',
    md: 'sk-form-radio-group-md',
    lg: 'sk-form-radio-group-lg',
  };

  const classes = cx('sk-form-radio-group', sizes[props.size]);

  return classes;
});
