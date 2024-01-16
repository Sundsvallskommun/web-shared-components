import { cx } from '@sk-web-gui/utils';
import { Icon } from '@sk-web-gui/icon';
import React from 'react';

export interface ChipProps extends React.ComponentPropsWithRef<'button'> {
  strong?: boolean;
  inverted?: boolean;
  rounded?: boolean;
}
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>((props, ref) => {
  const { className, strong, inverted, rounded, children, ...rest } = props;

  return (
    <button
      ref={ref}
      className={cx('sk-chip', className)}
      data-strong={strong ? 'true' : undefined}
      data-inverted={inverted ? 'true' : undefined}
      data-rounded={rounded ? 'true' : undefined}
      {...rest}
    >
      {children}
      <Icon name="x" size="1.6rem" />
    </button>
  );
});
