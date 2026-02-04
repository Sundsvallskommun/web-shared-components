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

export const useAlertContentClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-alert-content-sm',
    md: 'sk-alert-content-md',
    lg: 'sk-alert-content-lg',
  };

  return cx('sk-alert-content', sizes[props?.size ?? 'md']);
});
