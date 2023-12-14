import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';

export interface LabelProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  color?: string;
  rounded?: boolean;
  inverted?: boolean;
}

export const Label = React.forwardRef<HTMLDivElement, LabelProps>((props, ref) => {
  const { color = 'tertiary', rounded = false, inverted = false, className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cx('sk-label', className)}
      data-rounded={rounded}
      data-color={color}
      data-inverted={inverted}
      {...rest}
    />
  );
});
