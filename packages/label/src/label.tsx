import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';

interface ILabelProps extends DefaultProps {
  color?: string;
  rounded?: boolean;
  inverted?: boolean;
}

export interface LabelProps extends ILabelProps, React.HTMLAttributes<HTMLDivElement> {}

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
