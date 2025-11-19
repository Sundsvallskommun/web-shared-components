import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useDisclosureClass = createMemoClass(({ variant, size, disabled }) => {
  const sizes: { [key: string]: string } = {
    sm: `sk-disclosure-sm`,
    md: `sk-disclosure-md`,
    lg: variant === 'default' ? `sk-disclosure-md` : `sk-disclosure-lg`,
  };

  const classes = cx(`sk-disclosure`, sizes[size ?? 'md'], disabled && `sk-disclosure-disabled`);
  return classes;
});

export const useDisclosureHeaderClass = createMemoClass(({ variant, size, disabled }) => {
  const sizes: { [key: string]: string } = {
    sm: `sk-disclosure-header-sm`,
    md: `sk-disclosure-header-md`,
    lg: variant === 'default' ? `sk-disclosure-header-md` : `sk-disclosure-header-lg`,
  };

  const classes = cx(`sk-disclosure-header`, sizes[size ?? 'md'], disabled && `sk-disclosure-header-disabled`);

  return classes;
});

export const useDisclosureHeaderTitleClass = createMemoClass(({ variant, size, disabled }) => {
  const sizes: { [key: string]: string } = {
    sm: `sk-disclosure-header-title-sm`,
    md: `sk-disclosure-header-title-md`,
    lg: variant === 'default' ? `sk-disclosure-header-title-md` : `sk-disclosure-header-title-lg`,
  };

  const classes = cx(
    `sk-disclosure-header-title`,
    sizes[size ?? 'md'],
    disabled && `sk-disclosure-header-title-disabled`
  );

  return classes;
});

export const useDisclosureHeaderIconClass = createMemoClass(({ variant, size, disabled }) => {
  const sizes: { [key: string]: string } = {
    sm: `sk-disclosure-header-icon-sm`,
    md: `sk-disclosure-header-icon-md`,
    lg: variant === 'default' ? `sk-disclosure-header-icon-md` : `sk-disclosure-header-icon-lg`,
  };

  const classes = cx(
    `sk-disclosure-header-icon`,
    sizes[size ?? 'md'],
    disabled && `sk-disclosure-header-icon-disabled`
  );

  return classes;
});
