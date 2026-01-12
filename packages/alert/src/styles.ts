import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useAlertClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-alert-sm',
    md: 'sk-alert-md',
    lg: 'sk-alert-lg',
  };

  return cx('sk-alert', sizes[props?.size ?? 'md']);
});

export const useAlertTitleClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-alert-title-sm',
    md: 'sk-alert-title-md',
    lg: 'sk-alert-title-lg',
  };

  return cx(sizes[props?.size ?? 'md']);
});
