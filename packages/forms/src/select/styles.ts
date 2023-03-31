import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useSelectClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'form-field-sm',
    md: 'form-field-md',
    lg: 'form-field-lg',
  };

  const classes = cx(sizes[props.size], props.disabled && 'form-field-disabled');

  return classes;
});
