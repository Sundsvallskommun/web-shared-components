import * as React from 'react';

import {
  Alert as InternalAlert,
  AlertProps as InternalAlertProps,
  AlertCloseButton,
  AlertCloseButtonProps,
} from './alert';

interface AlertProps
  extends InternalAlertProps,
    React.ForwardRefExoticComponent<InternalAlertProps & React.RefAttributes<HTMLDivElement>> {
  CloseButton: typeof AlertCloseButton;
}

const Alert = InternalAlert as AlertProps;

Alert.CloseButton = AlertCloseButton;

export type { AlertProps, AlertCloseButtonProps };

export { Alert, AlertCloseButton };
