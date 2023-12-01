import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import * as React from 'react';

interface ITooltipProps extends DefaultProps {
  /** Select the position of the tooltip
   * @default down
   */
  position?: 'down' | 'up' | 'right' | 'left';
  /** React Node */
  children?: React.ReactNode;
}

export interface TooltipProps extends React.HTMLAttributes<HTMLElement>, ITooltipProps {}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const { children, className, position = 'down', ...rest } = props;

  return (
    <div ref={ref} data-position={position ? position : undefined} className={cx('sk-tooltip', className)} {...rest}>
      <span className={cx('sk-tooltip-text', className)}>{children}</span>
    </div>
  );
});

if (__DEV__) {
  Tooltip.displayName = 'Tooltip';
}
export default Tooltip;
