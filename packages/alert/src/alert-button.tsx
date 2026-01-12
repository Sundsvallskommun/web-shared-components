import React from 'react';
import { cx } from '@sk-web-gui/utils';
import Button, { ButtonProps } from '@sk-web-gui/button';

export interface AlertActionButtonProps extends Omit<React.ComponentPropsWithoutRef<ButtonProps['Component']>, 'ref'> {
  children: React.ReactNode;
}

export const AlertButton = React.forwardRef<HTMLButtonElement, AlertActionButtonProps>((props, ref) => {
  const { children, className, variant = 'tertiary', showBackground = false, ...rest } = props;

  return (
    <Button
      ref={ref}
      className={cx('sk-alert-button', className)}
      variant={variant}
      showBackground={showBackground}
      {...rest}
    >
      {children}
    </Button>
  );
});
