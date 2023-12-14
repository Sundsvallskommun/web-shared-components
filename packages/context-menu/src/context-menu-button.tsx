import { Menu } from '@headlessui/react';

import { Button, ButtonProps } from '@sk-web-gui/button';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { useButtonClass } from './styles';

export const ContextMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<ButtonProps['Component']>
>((props, ref) => {
  const {
    disabled: _disabled,
    loading,
    active,
    loadingText,
    leftIcon,
    rightIcon,
    iconButton,
    children,
    className,
    color,
    variant = 'outline',
    size = 'md',
    rounded = false,
    ...rest
  } = props;
  const disabled = _disabled || loading;

  const classes = useButtonClass({
    variant,
    size,
    disabled,
  });

  return (
    <Menu.Button
      ref={ref}
      data-rounded={rounded ? rounded : undefined}
      data-active={active ? 'true' : undefined}
      data-color={color ? color : undefined}
      data-icon={iconButton ? iconButton : undefined}
      className={cx(classes, className, 'inline')}
      disabled={disabled}
      {...rest}
    >
      <Button.Content loadingText={loadingText} loading={loading} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button.Content>
    </Menu.Button>
  );
});
