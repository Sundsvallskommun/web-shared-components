import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useTagClass = createMemoClass((props) => {
  const variantClasses: { [key: string]: string } = {
    outline: 'tag-outline',
    solid: 'tag-solid',
    light: 'tag-light',
  };

  const sizes: { [key: string]: string } = {
    sm: 'tag-sm',
    md: 'tag-md',
    lg: 'tag-lg',
  };

  const classes = cx('tag', sizes[props.size], variantClasses[props.variant], props.disabled && 'btn-disabled');

  return classes;
});
