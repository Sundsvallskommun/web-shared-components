import React from 'react';
import { Icon, IconProps } from '../src/icon';
import { cx } from '@sk-web-gui/utils';

export const IconPadded = (props: IconProps) => {
  const { children, className, ...rest } = props;

  return (
    <Icon className={cx('sk-icon-padded', className)} {...rest}>
      {children}
    </Icon>
  );
};
