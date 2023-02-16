import { Menu } from '@headlessui/react';

import { ButtonProps, getButtonContent } from '@sk-web-gui/button';
import { cx } from '@sk-web-gui/utils';
import * as React from 'react';
import { useButtonClass } from './styles';

export const ContextMenuButton: React.FC<ButtonProps> = (props) => {
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
      data-rounded={rounded ? rounded : undefined}
      data-active={active ? 'true' : undefined}
      data-color={color ? color : undefined}
      data-icon={iconButton ? iconButton : undefined}
      className={cx(classes, className, 'inline')}
      {...rest}
    >
      {getButtonContent(props)}
    </Menu.Button>
  );
};
