import React from 'react';

import { Alert as InternalAlert, AlertProps as InternalAlertProps, AlertCloseButton } from './alert';

interface AlertProps extends React.ForwardRefExoticComponent<InternalAlertProps> {
  Component: typeof InternalAlert;
  CloseButton: typeof AlertCloseButton;
}

export const Alert = {
  ...InternalAlert,
  Component: InternalAlert,
  CloseButton: AlertCloseButton,
} as AlertProps;

export type { AlertProps };

export default Alert;
