import { __DEV__, cx, DefaultProps } from '@sk-web-gui/utils';
import { icons } from 'lucide-react';
import React from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

type IconNames = keyof typeof dynamicIconImports;

export interface IconProps extends DefaultProps, React.ComponentPropsWithRef<'span'> {
  name?: IconNames;
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

function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
  return text.replace(/-/, '').toUpperCase();
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    name,
    color = 'primary',
    icon,
    rounded = false,
    inverted = false,
    variant = 'tertiary',
    size,
    className,
    ...rest
  } = props;
  const LucideIcon = name ? icons[toPascalCase(name) as keyof typeof icons] : undefined;
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
      data-testid={name ? `sk-icon-${name}` : undefined}
      {...rest}
    >
      {icon ? icon : LucideIcon ? <LucideIcon /> : undefined}
    </span>
  );
});

if (__DEV__) {
  Icon.displayName = 'Icon';
}

export default Icon;
