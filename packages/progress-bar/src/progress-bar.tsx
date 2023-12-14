import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

export interface ProgressBarProps extends DefaultProps, Omit<React.ComponentPropsWithRef<'div'>, 'color'> {
  /** @default 100 */
  steps?: number;
  /** Current step
   * @default 0
   */
  current?: number;
  /** Set the bar color
   * @default tertiary
   */
  color?: 'tertiary' | 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar';
  /** @default false */
  accent?: boolean;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
  const { steps = 100, current = 0, color = 'tertiary', accent = false, className, ...rest } = props;
  const fill = Math.round((current / steps) * 100);
  return (
    <div
      ref={ref}
      className={cx('sk-progress-bar', className)}
      data-color={color}
      data-accent={accent ? accent : undefined}
      {...rest}
    >
      <div className={cx('sk-progress-bar-fill')} style={{ width: `${fill}%` }}></div>
    </div>
  );
});

if (__DEV__) {
  ProgressBar.displayName = 'ProgressBar';
}

export default ProgressBar;
