import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useDisclosureClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-disclosure-sm',
    md: 'sk-disclosure-md',
    lg: props.variant === 'default' ? 'sk-disclosure-md' : 'sk-disclosure-lg',
  };

  const classes = cx('sk-disclosure', sizes[props.size], props.disabled && 'sk-disclosure-disabled');

  return classes;
});
