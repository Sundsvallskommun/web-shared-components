import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useLinkClass = createMemoClass((props) => {
  const variantClasses: { [key: string]: string } = {
    primary: 'sk-link-primary',
    tertiary: 'sk-link-tertiary',
  };

  const sizes: { [key: string]: string } = {
    sm: 'sk-link-sm',
    md: 'sk-link-md',
    lg: 'sk-link-lg',
    xl: 'sk-link-xl',
  };

  const classes = cx(
    'sk-link',
    sizes[props?.size ?? 'md'],
    variantClasses[props?.variant ?? 'primary'],
    props.disabled && 'sk-link-disabled'
  );

  return classes;
});
