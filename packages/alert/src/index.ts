import React from 'react';
import { AlertComponent, AlertComponentProps } from './alert';
import { AlertContentComponentProps, AlertContentComponent } from './alert-content';
import { AlertButton } from './alert-button';
import { AlertContentDescription } from './alert-content-description';
import { AlertIcon } from './alert-icon';
import { AlertContentTitle } from './alert-content-title';

interface AlertContentProps extends React.ForwardRefExoticComponent<AlertContentComponentProps> {
  Component: typeof AlertContentComponent;
  Title: typeof AlertContentTitle;
  Description: typeof AlertContentDescription;
}

const AlertContent = {
  ...AlertContentComponent,
  Component: AlertContentComponent,
  Title: AlertContentTitle,
  Description: AlertContentDescription,
} as AlertContentProps;

interface AlertProps extends React.ForwardRefExoticComponent<AlertComponentProps> {
  Component: typeof AlertComponent;
  Icon: typeof AlertIcon;
  Content: typeof AlertContent;
  Button: typeof AlertButton;
}

export const Alert: AlertProps = {
  ...AlertComponent,
  Component: AlertComponent,
  Icon: AlertIcon,
  Content: AlertContent,
  Button: AlertButton,
} as AlertProps;

export type { AlertProps };
export default Alert;
