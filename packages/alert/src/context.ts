import React from 'react';
import { UseAlertProps } from './alert';
import { IconProps } from '@sk-web-gui/icon';

export const AlertContext = React.createContext<UseAlertProps>({ size: 'md' });

const useAlertContext = () => React.useContext(AlertContext);

interface UseAlertData extends UseAlertProps {
  size: 'sm' | 'md' | 'lg';
  icon?: React.ComponentProps<IconProps['Component']>['icon'];
  iconColor?: 'warning' | 'error' | 'vattjom' | 'tertiary' | 'gronsta';
}

export const useAlert = (): UseAlertData => {
  const context = useAlertContext();
  return { ...context };
};
