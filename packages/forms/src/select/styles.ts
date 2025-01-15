import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useSelectClass = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-select-sm',
    md: 'sk-form-select-md',
    lg: 'sk-form-select-lg',
  };
  const variant: { [key: string]: string } = {
    primary: 'sk-form-select-primary',
    tertiary: 'sk-form-select-tertiary',
  };

  const classes = cx('sk-form-select', sizes[props?.size ?? 'md'], variant[props?.variant ?? 'primary']);

  return classes;
});
