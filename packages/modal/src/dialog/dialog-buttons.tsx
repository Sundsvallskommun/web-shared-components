import { DefaultProps } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';
import * as React from 'react';

interface DialogButtonsProps extends React.HTMLAttributes<HTMLDivElement>, DefaultProps {}

export const DialogButtons = React.forwardRef<HTMLDivElement, DialogButtonsProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div ref={ref} className={cx('dialog-buttons', className)} {...rest}>
      {children}
    </div>
  );
});
