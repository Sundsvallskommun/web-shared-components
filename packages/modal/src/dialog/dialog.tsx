import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { IModalProps, Modal } from '../modal';
import { DialogButtons } from './dialog-buttons';
import { DialogContent } from './dialog-content';

interface IDialogProps<T = boolean | string | undefined> extends Omit<IModalProps, 'onClose'> {
  onClose?: (data?: T) => void;
}

export interface InternalDialogProps extends React.HTMLAttributes<HTMLDivElement>, IDialogProps {}

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

interface DialogProps
  extends InternalDialogProps,
    React.ForwardRefExoticComponent<InternalDialogProps & React.RefAttributes<HTMLDivElement>> {
  Buttons: typeof DialogButtons;
  Content: typeof DialogContent;
}

export const Dialog = DialogComponent as DialogProps;

Dialog.Buttons = DialogButtons;
Dialog.Content = DialogContent;

if (__DEV__) {
  Dialog.displayName = 'Dialog';
}

export type { DialogProps };
export default Dialog;
