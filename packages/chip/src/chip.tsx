import { cx } from '@sk-web-gui/utils';
import { Icon } from '@sk-web-gui/icon';
import React from 'react';
import { X } from 'lucide-react';

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
      <Icon icon={<X />} />
    </button>
  );
});
