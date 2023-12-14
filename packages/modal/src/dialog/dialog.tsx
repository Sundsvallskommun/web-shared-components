import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { Modal } from '../modal';

export interface InternalDialogProps
  extends Omit<React.ComponentProps<typeof Modal.Component>, 'onClose'>,
    React.ComponentPropsWithRef<'div'> {
  onClose?: (data?: boolean | string | undefined) => void;
}

export const DialogComponent = React.forwardRef<HTMLDivElement, InternalDialogProps>((props, ref) => {
  const { className, hideClosebutton = true, disableCloseOutside = true, ...rest } = props;

  return (
    <Modal
      ref={ref}
      hideClosebutton={hideClosebutton}
      disableCloseOutside={disableCloseOutside}
      className={cx('sk-dialog', className)}
      {...rest}
    ></Modal>
  );
});

if (__DEV__) {
  DialogComponent.displayName = 'DialogComponent';
}

export default DialogComponent;
