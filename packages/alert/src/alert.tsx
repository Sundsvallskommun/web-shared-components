import React, { JSX, ReactNode, useState } from 'react';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import { useAlertClass, useAlertTitleClass } from './styles';
import { AlertTriangle, Check, CircleX, InfoIcon, X } from 'lucide-react';
import { IconProps } from '@sk-web-gui/icon';
import { Icon } from '@sk-web-gui/icon';
import Button from '@sk-web-gui/button';

interface AlertType {
  [key: string]: {
    icon: React.ComponentProps<IconProps['Component']>['icon'];
    iconColor: 'warning' | 'error' | 'vattjom' | 'tertiary' | 'gronsta' | undefined;
    styling: string;
  };
}

export interface AlertProps extends DefaultProps {
  title: string;
  subText?: string;
  type?: 'neutral' | 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  show?: boolean;
  showIcon?: boolean;
  customIcon?: JSX.Element;
  showButton?: boolean;
  customButton?: ReactNode;
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

const translateIconSize = (size: string) => {
  switch (size) {
    case 'sm':
      return 16.5;
    case 'md':
      return 18.5;
    case 'lg':
      return 20;
    default:
      return 18.5;
  }
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    title,
    subText,
    type = 'info',
    size = 'md',
    showIcon = true,
    customIcon,
    showButton = true,
    customButton,
    show = true,
    className,
    ...rest
  } = props;
  const classes = useAlertClass({ size, type });
  const titleClasses = useAlertTitleClass({ size });
  const { icon, iconColor, styling } = types[type];
  const alertIcon: ReactNode = (
    <Icon icon={customIcon ? customIcon : icon} size={translateIconSize(size)} color={iconColor} />
  );
  const [showAlert, setShowAlert] = useState<boolean>(show);

  const handleClose = () => {
    setShowAlert(false);
  };

  return showAlert ? (
    <div ref={ref} className={cx(classes, styling, className)} {...rest}>
      <div className="sk-alert-wrapper">
        <div className="sk-alert-icon-container">{showIcon ? alertIcon : null}</div>
        <div className="sk-alert-text-container">
          <p className={cx(titleClasses)}>{title}</p>
          {subText ? <p className="sk-alert-sub-text">{subText}</p> : null}
        </div>
      </div>

      <div className="sk-alert-button-wrapper">
        {showButton ? (
          customButton ? (
            customButton
          ) : (
            <Button
              iconButton
              showBackground={false}
              variant="tertiary"
              size="sm"
              leftIcon={<Icon icon={<X />} />}
              onClick={handleClose}
            />
          )
        ) : null}
      </div>
    </div>
  ) : null;
});

if (__DEV__) {
  Alert.displayName = 'Alert';
}

export default Alert;
