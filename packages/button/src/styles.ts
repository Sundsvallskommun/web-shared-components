import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useButtonClass = createMemoClass((props) => {
  const variantClasses: { [key: string]: string } = {
    primary: 'sk-btn-primary',
    secondary: 'sk-btn-secondary',
    tertiary: 'sk-btn-tertiary',
    ghost: 'sk-btn-ghost',
    link: 'sk-btn-link',
  };

  const sizes: { [key: string]: string } = {
    sm: 'sk-btn-sm',
    md: 'sk-btn-md',
    lg: 'sk-btn-lg',
  };

  const classes = cx(
    'sk-btn',
    sizes[props?.size ?? 'md'],
    variantClasses[props?.variant ?? 'primary'],
    props.disabled && 'sk-btn-disabled'
  );

  return classes;
});
