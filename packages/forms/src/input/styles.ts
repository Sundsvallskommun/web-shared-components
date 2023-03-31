import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useInputClass = createMemoClass((props) => {
  const variantClasses: { [key: string]: string } = {
    outline: 'form-field-outline',
    solid: 'form-field-solid',
  };

  const sizes: { [key: string]: string } = {
    sm: 'form-field-sm',
    md: 'form-field-md',
    lg: 'form-field-lg',
  };

  const classes = cx(
    'form-field',
    sizes[props.size],
    variantClasses[props.variant],
    props.disabled && 'form-field-disabled'
  );

  return classes;
});
