import { Player } from '@lottiefiles/react-lottie-player';
import { SpinnerAnimation } from './assets/spinner-square';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
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
      <Player
        autoplay
        loop
        src={SpinnerAnimation}
        renderer="svg"
        style={{ width: `${size * 2}rem`, height: `${size * 2}rem`, margin: '0px' }}
        className={cx('sk-spinner-lottie')}
      ></Player>
    </div>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}

export default Spinner;
