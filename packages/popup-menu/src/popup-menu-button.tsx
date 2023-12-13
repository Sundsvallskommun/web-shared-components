import { Menu } from '@headlessui/react';

import { ButtonProps, getButtonContent } from '@sk-web-gui/button';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { useButtonClass } from './styles';

export const PopupMenuButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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
    variant = 'tertiary',
    size = 'md',
    rounded = false,
    inverted,
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
      data-inverted={inverted ? inverted : undefined}
      className={cx(classes, className)}
      disabled={disabled}
      {...rest}
    >
      {getButtonContent({ loadingText, loading, leftIcon, rightIcon, children })}
    </Menu.Button>
  );
});
