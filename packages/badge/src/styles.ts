import { cx } from '@sk-web-gui/utils';
import { createMemoClass } from '@sk-web-gui/theme';

export const useBadgeClass = createMemoClass((props) => {

  const variants = {
    solid: 'badge-solid',
    outline: 'badge-outline',
  };
  
  const sizes = {
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg',
  
  };

  
  const classes = cx('badge', sizes[props.size], variants[props.variant]);

  return classes;
});
