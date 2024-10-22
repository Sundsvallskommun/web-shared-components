import React from 'react';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';

interface ICalloutProps extends DefaultProps {
  /** @default tertiary */
  color?: 'tertiary' | 'warning' | 'error' | 'vattjom' | 'gronsta';
  /** @default false */
  inverted?: boolean;
}

export interface CalloutProps extends Omit<React.ComponentPropsWithRef<'span'>, 'color'>, ICalloutProps {}

export const Callout = React.forwardRef<HTMLSpanElement, CalloutProps>((props, ref) => {
  const { color = 'tertiary', inverted = false, className, ...rest } = props;

  return (
    <span
      ref={ref}
      className={cx('sk-callout', className)}
      data-color={color ? color : undefined}
      data-inverted={inverted ? inverted : undefined}
      {...rest}
    >
      <span className={cx('sk-callout-content')}></span>
    </span>
  );
});

if (__DEV__) {
  Callout.displayName = 'Callout';
}

export default Callout;
