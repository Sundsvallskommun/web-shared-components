import { DefaultProps } from '@sk-web-gui/utils';
import { cx } from '@sk-web-gui/utils';
import * as React from 'react';

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement>, DefaultProps {}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div ref={ref} className={cx('dialog-content', className)} {...rest}>
      {children}
    </div>
  );
});

export default DialogContent;
