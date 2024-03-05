import React from 'react';
import { DialogComponent, InternalDialogProps } from './dialog';
import { DialogButtons } from './dialog-buttons';
import { DialogContent } from './dialog-content';

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

export type { DialogProps };
export default Dialog;
