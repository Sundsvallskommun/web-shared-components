import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import * as React from 'react';

interface ITooltipProps extends DefaultProps {
  /** Select the position of the tooltip
   * @default down
   */
  position?: 'above' | 'below' | 'right' | 'left';
  /** React Node */
  children?: React.ReactNode;
}

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement>, ITooltipProps {}

export const Tooltip = React.forwardRef<HTMLSpanElement, TooltipProps>((props, ref) => {
  const { children, className, position = 'above', ...rest } = props;

  return (
    <span ref={ref} data-position={position ? position : undefined} className={cx('sk-tooltip', className)} {...rest}>
      <span className={cx('sk-tooltip-text', className)}>{children}</span>
    </span>
  );
});

if (__DEV__) {
  Tooltip.displayName = 'Tooltip';
}

export default Tooltip;
