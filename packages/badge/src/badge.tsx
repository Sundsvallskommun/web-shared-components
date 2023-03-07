import { DefaultProps } from '@sk-web-gui/theme';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

import { useBadgeClass } from './styles';

interface IBadgeProps extends DefaultProps {
  /* The color of badge */
  color?: 'primary' | 'warning' | 'error' | 'neutral';
  /* Controls badge appearance */
  variant?: 'outline' | 'solid';
  /* The size of badge */
  size?: 'sm' | 'md' | 'lg';
  /* The badge number */
  counter?: number;
  /*The miximum number ability to show */
  max?: number;
  /*the position of the badge as child in relation to another component */
  position?: 'standard' | 'super' | 'super-overlap';
}

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, IBadgeProps {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { color, variant = 'solid', className, size = 'sm', counter, max, position, ...rest } = props;

  const classes = useBadgeClass({ variant, size, position });
  return (
    <span
      ref={ref}
      data-color={color ? color : undefined}
      className={`${
        counter && counter > 99
          ? `${(size == 'md' && 'badge-roundedcorners-md') || (size == 'lg' && 'badge-roundedcorners-lg')}`
          : `badge-fullrounded`
      }
      ${size == 'sm' && position == 'standard' && 'badge-standard-sm'}
      ${size == 'md' && position == 'standard' && 'badge-standard-md'}
      ${size == 'lg' && position == 'standard' && 'badge-standard-lg'}

      ${size == 'sm' && position == 'super' && 'badge-super-sm'}
      ${size == 'md' && position == 'super' && 'badge-super-md'}
      ${size == 'lg' && position == 'super' && 'badge-super-lg'}

      ${size == 'sm' && position == 'super-overlap' && 'badge-superoverlap-sm'}
      ${size == 'md' && position == 'super-overlap' && 'badge-superoverlap-md'}
      ${size == 'lg' && position == 'super-overlap' && 'badge-superoverlap-lg'}
         
      ${cx(classes, className)}`}
      {...rest}
    >
      {counter && max && counter > max ? `${max}+` : counter}
    </span>
  );
});

if (__DEV__) {
  Badge.displayName = 'Badge';
}
