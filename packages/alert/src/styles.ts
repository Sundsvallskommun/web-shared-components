import { cx } from '@sk-web-gui/utils';
import { createMemoClass } from '@sk-web-gui/theme';

const variantClasses: { [key: string]: string } = {
  subtle: 'alert-subtle',
  solid: 'alert-solid',
  'left-accent': 'alert-left-accent',
};

export const useAlertCloseButton = createMemoClass(() => {
  return cx('alert-close-button');
});

export const useAlertClass = createMemoClass((props) => {
  return cx('alert', variantClasses[props.variant]);
});
