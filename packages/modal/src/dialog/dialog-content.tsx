import { DefaultProps } from '@sk-web-gui/utils';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { ModalContent } from '../modal/modal-content';

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement>, DefaultProps {}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <ModalContent ref={ref} className={cx('sk-dialog-content', className)} {...rest}>
      {children}
    </ModalContent>
  );
});

export default DialogContent;
