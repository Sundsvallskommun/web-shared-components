import { cx, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { Modal } from '../modal';
import { DialogButtons } from './dialog-buttons';
import { DialogContent } from './dialog-content';

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

interface DialogProps extends React.ForwardRefExoticComponent<InternalDialogProps> {
  Component: typeof DialogComponent;
  Buttons: typeof DialogButtons;
  Content: typeof DialogContent;
}

export const Dialog = {
  ...DialogComponent,
  Component: DialogComponent,
  Buttons: DialogButtons,
  Content: DialogContent,
} as DialogProps;

if (__DEV__) {
  Dialog.displayName = 'Dialog';
}

export type { DialogProps };
export default Dialog;
