import React from 'react';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import { useAlertClass } from './styles';
import { AlertTriangle, Check, CircleX, InfoIcon } from 'lucide-react';
import { IconProps } from '@sk-web-gui/icon';
import { AlertContext } from './context';

interface AlertType {
  [key: string]: {
    icon: React.ComponentProps<IconProps['Component']>['icon'];
    iconColor: 'warning' | 'error' | 'vattjom' | 'tertiary' | 'gronsta';
    styling: string;
  };
}

export interface AlertComponentProps extends DefaultProps {
  type?: 'neutral' | 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export interface UseAlertProps extends AlertComponentProps {
  size: 'sm' | 'md' | 'lg';
  icon?: React.ComponentProps<IconProps['Component']>['icon'];
  iconColor?: 'warning' | 'error' | 'vattjom' | 'tertiary' | 'gronsta';
}

const types: AlertType = {
  info: {
    icon: <InfoIcon />,
    iconColor: 'vattjom',
    styling: 'sk-alert-info',
  },
  neutral: {
    icon: <InfoIcon />,
    iconColor: 'tertiary',
    styling: 'sk-alert-neutral',
  },
  success: {
    icon: <Check />,
    iconColor: 'gronsta',
    styling: 'sk-alert-success',
  },
  warning: {
    icon: <AlertTriangle />,
    iconColor: 'warning',
    styling: 'sk-alert-warning',
  },
  error: {
    icon: <CircleX />,
    iconColor: 'error',
    styling: 'sk-alert-error',
  },
};

export const AlertComponent = React.forwardRef<HTMLDivElement, AlertComponentProps>((props, ref) => {
  const { type = 'info', size = 'md', className, children, ...rest } = props;
  const classes = useAlertClass({ size });
  const { icon, iconColor, styling } = types[type];
  const context = { size, icon, iconColor };

  return (
    <AlertContext.Provider value={context}>
      <div ref={ref} className={cx(classes, styling, className)} {...rest}>
        {children}
      </div>
    </AlertContext.Provider>
  );
});

if (__DEV__) {
  AlertComponent.displayName = 'Alert';
}

export default AlertComponent;
