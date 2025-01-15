import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useComboboxStyles = createMemoClass((props) => {
  const sizes: { [key: string]: string } = {
    sm: 'sk-form-combobox-sm',
    md: 'sk-form-combobox-md',
    lg: 'sk-form-combobox-lg',
  };

  const variant: { [key: string]: string } = {
    primary: 'sk-form-combobox-primary',
    tertiary: 'sk-form-combobox-tertiary',
  };

  const classes = cx('sk-form-combobox', sizes[props?.size ?? 'md'], variant[props?.variant ?? 'primary']);

  return classes;
});
