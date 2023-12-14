import React from 'react';
import { __DEV__, cx } from '@sk-web-gui/utils';
import { Icon, IconProps } from './icon';

export const IconPadded = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Icon ref={ref} className={cx('sk-icon-padded', className)} {...rest}>
      {children}
    </Icon>
  );
});

if (__DEV__) {
  IconPadded.displayName = 'IconPadded';
}

export default IconPadded;
