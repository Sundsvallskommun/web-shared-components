import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { ModalContent } from '../modal/modal-content';

interface DialogContentProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <ModalContent ref={ref} className={cx('sk-dialog-content', className)} {...rest}>
      {children}
    </ModalContent>
  );
});

export default DialogContent;
