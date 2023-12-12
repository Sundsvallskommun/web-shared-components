import { Player } from '@lottiefiles/react-lottie-player';
import Animation from '../src/assets/spinner-square.json';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import * as React from 'react';

export interface ISpinnerProps extends DefaultProps {
  /** Set size of the spinner
   * @default 250
   */
  size?: number;

  /** Set color of the spinner
   * @default tertiary
   */
  color?: 'tertiary' | 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar';
}

export interface SpinnerProps extends Omit<React.HTMLAttributes<SVGSVGElement>, 'color'>, ISpinnerProps {}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>((props, ref) => {
  const { size = 250, color = 'tertiary', className, ...rest } = props;

  return (
    <div className={cx('sk-spinner', className)} data-color={color ? color : undefined}>
      <Player
        autoplay
        loop
        src={Animation}
        renderer="svg"
        style={{ width: `${size}px`, height: `${size}px` }}
        className={cx('sk-spinner-lottie', className)}
      ></Player>
    </div>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}

export default Spinner;
