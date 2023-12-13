import React from 'react';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';

interface IBadgeProps extends DefaultProps {
  color?: 'tertiary' | 'warning' | 'error' | 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar';
  counter?: string | number;
  inverted?: boolean;
  rounded?: boolean;
}

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, IBadgeProps {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { color = 'tertiary', rounded, counter, inverted = false, className, ...rest } = props;

  return (
    <span
      ref={ref}
      className={cx('sk-badge', className)}
      data-color={color ? color : undefined}
      data-rounded={rounded ? rounded : undefined}
      data-inverted={inverted ? inverted : undefined}
      {...rest}
    >
      <span className={cx('sk-badge-content')}>{counter}</span>
    </span>
  );
});

if (__DEV__) {
  Badge.displayName = 'Badge';
}

export default Badge;
