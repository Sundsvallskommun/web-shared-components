import { cx } from '@sk-web-gui/utils';
import React from 'react';

export type CardWrapperProps = React.ComponentPropsWithRef<'div'>;

export const CardWrapper = React.forwardRef<HTMLDivElement, CardWrapperProps>((props, ref) => {
  const { className, ...rest } = props;
  return <div className={cx('sk-card-wrapper', className)} ref={ref} {...rest} />;
});
