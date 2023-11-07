import React from 'react';
import { cx, DefaultProps } from '@sk-web-gui/utils';

export interface IconProps extends DefaultProps {
  name?: string;
  /** @default primary */
  color?: 'primary' | 'warning' | 'error' | 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar';
  icon?: React.ReactElement;
  rounded?: boolean;
  inverted?: boolean;
  /** @default tertiary */
  variant?: 'tertiary' | 'ghost';
  /** @default normal */
  size?: 'normal' | 'fit';
}

export const Icon = (props: IconProps) => {
  const {
    name,
    color = 'primary',
    icon,
    rounded,
    inverted,
    variant = 'tertiary',
    size = 'normal',
    className,
    ...rest
  } = props;
  return (
    <span
      className={cx('sk-icon', !icon && `icon-${name}`, className)}
      aria-hidden={true}
      data-variant={variant}
      data-color={color ? color : undefined}
      data-rounded={rounded ? rounded : undefined}
      data-inverted={inverted ? inverted : undefined}
      data-size={size ? size : undefined}
      data-testid={`sk-icon-${name}`}
      {...rest}
    >
      {icon ? icon : undefined}
    </span>
  );
};

export default Icon;
