import { __DEV__, cx, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';

export interface SpinnerProps extends DefaultProps, Omit<React.ComponentPropsWithRef<'div'>, 'color'> {
  /** Set size of the spinner in rem
   * @default 4
   */
  size?: number;

  /** Set color of the spinner
   * @default tertiary
   */
  color?: 'tertiary' | 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar' | 'warning' | 'info' | 'success' | 'error';
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => {
  const { size = 4, color = 'tertiary', className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cx('sk-spinner', className)}
      data-color={color ? color : undefined}
      style={{ width: `${size}rem`, height: `${size}rem` }}
      {...rest}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
          <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3" strokeLinecap="round">
            <animate
              attributeName="stroke-dasharray"
              dur="1.5s"
              calcMode="spline"
              values="0 150;42 150;42 150;42 150"
              keyTimes="0;0.475;0.95;1"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              dur="1.5s"
              calcMode="spline"
              values="0;-16;-59;-59"
              keyTimes="0;0.475;0.95;1"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
              repeatCount="indefinite"
            />
          </circle>
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1.5s"
            values="0 12 12;360 12 12"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}

export default Spinner;
