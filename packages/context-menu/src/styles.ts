import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useButtonClass = createMemoClass((props) => {
  const variantClasses: { [key: string]: string } = {
    outline: 'btn-outline',
    solid: 'btn-solid',
    ghost: 'btn-ghost',
    light: 'btn-light',
    link: 'btn-link',
    icon: 'btn-icon',
  };

  const sizes: { [key: string]: string } = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl',
  };

  const classes = cx(
    'btn context-menu-button',
    sizes[props.size],
    variantClasses[props.variant],
    props.disabled && 'btn-disabled'
  );

  return classes;
});
