import Lottie from 'lottie-react';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { SpinnerAnimation } from './assets/spinner-square';

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
      <Lottie
        autoplay
        loop
        animationData={SpinnerAnimation}
        renderer="svg"
        className={cx('sk-spinner-lottie')}
      ></Lottie>
    </div>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}

export default Spinner;
