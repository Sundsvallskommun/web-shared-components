import { __DEV__, cx, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';

export interface IconProps extends DefaultProps, React.ComponentPropsWithRef<'span'> {
  /** @default primary */
  color?:
    | 'tertiary'
    | 'info'
    | 'success'
    | 'primary'
    | 'warning'
    | 'error'
    | 'vattjom'
    | 'gronsta'
    | 'bjornstigen'
    | 'juniskar';
  icon?: React.ReactElement;
  /** @default false */
  rounded?: boolean;
  /** @default false */
  inverted?: boolean;
  /** @default tertiary */
  variant?: 'tertiary' | 'ghost';
  /** @default 2.4rem */
  size?: number | string | 'fit';
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    color = 'primary',
    icon,
    rounded = false,
    inverted = false,
    variant = 'tertiary',
    size,
    className,
    ...rest
  } = props;

  return (
    <span
      ref={ref}
      className={cx('sk-icon', className)}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden={true}
      data-variant={variant}
      data-color={color ? color : undefined}
      data-rounded={rounded ? rounded : undefined}
      data-inverted={inverted ? inverted : undefined}
      data-size={size ? size : undefined}
      {...rest}
    >
      {icon}
    </span>
  );
});

if (__DEV__) {
  Icon.displayName = 'Icon';
}

export default Icon;
