import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useDisclosureClass = createMemoClass((props) => {
  const variantClasses: { [key: string]: string } = {
    outline: 'sk-disclosure-outline',
    solid: 'sk-disclosure-solid',
    plain: 'sk-disclosure-plain',
  };

  const classes = cx('sk-disclosure', variantClasses[props.variant], props.disabled && 'sk-disclosure-disabled');

  return classes;
});
