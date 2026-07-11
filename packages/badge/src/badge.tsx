import React from 'react';
import type { DefaultColor } from '@sk-web-gui/utils';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';

interface IBadgeProps extends DefaultProps {
  color?: DefaultColor | 'tertiary';
  counter?: string | number;
  inverted?: boolean;
  rounded?: boolean;
  /**
   * @default md
   */
  size?: 'sm' | 'md';
}

export interface BadgeProps extends Omit<React.ComponentPropsWithRef<'span'>, 'color'>, IBadgeProps {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { color = 'tertiary', rounded, counter, inverted = false, size = 'md', className, ...rest } = props;

  return (
    <span
      ref={ref}
      className={cx('sk-badge', className)}
      data-color={color ? color : undefined}
      data-rounded={rounded ? rounded : undefined}
      data-inverted={inverted ? inverted : undefined}
      data-size={size ? size : undefined}
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
