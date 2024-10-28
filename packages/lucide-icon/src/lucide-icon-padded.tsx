import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import LucideIcon, { type LucideIconProps } from './lucide-icon';

export const LucideIconPadded = React.forwardRef<HTMLSpanElement, LucideIconProps>((props, ref) => {
  const { className, ...rest } = props;

  return <LucideIcon ref={ref} className={cx('sk-icon-padded', className)} {...rest} />;
});

if (__DEV__) {
  LucideIconPadded.displayName = 'LucideIconPadded';
}

export default LucideIconPadded;
