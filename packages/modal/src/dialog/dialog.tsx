import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { IModalProps, Modal } from '../modal';
import { DialogButtons } from './dialog-buttons';
import { DialogContent } from './dialog-content';

interface IDialogProps extends Omit<IModalProps, 'onClose'> {
  onClose?: (data?: any) => void;
}

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement>, IDialogProps {}

export const DialogComponent = React.forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const { className, hideClosebutton = true, disableCloseOutside = true, ...rest } = props;

  return (
    <Modal
      ref={ref}
      hideClosebutton={hideClosebutton}
      disableCloseOutside={disableCloseOutside}
      className={cx('dialog', className)}
      {...rest}
    ></Modal>
  );
});

interface Dialog extends React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLElement>> {
  Buttons: typeof DialogButtons;
  Content: typeof DialogContent;
}

export const Dialog = DialogComponent as Dialog;

Dialog.Buttons = DialogButtons;
Dialog.Content = DialogContent;

if (__DEV__) {
  Dialog.displayName = 'Dialog';
}