import { useLocalStorageValue } from '@react-hookz/web';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import React, { useEffect, useState } from 'react';
import { __DEV__ } from '@sk-web-gui/utils';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface AlertBannerProps {
  message: React.ReactNode;
  className?: string;
  /** For example a max-width to match site content max-width */
  contentClassName?: string;
  severity?: 'neutral' | 'info' | 'success' | 'warning' | 'error';
  showClose?: boolean;
  closeAriaLabel?: 'Stäng meddelandet';
}

export const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>((props, ref) => {
  const { message, className = '', contentClassName = '', severity = 'info', showClose = true, closeAriaLabel } = props;

  const localstorageKey = 'alert-banner-is-open';
  const [open, setOpen] = useLocalStorageValue(localstorageKey, true, {
    storeDefaultValue: true,
    initializeWithStorageValue: true,
  });

  if (!open) {
    return <></>;
  }

  let bgColor, iconColor, icon;

  switch (severity) {
    case 'info':
      bgColor = 'bg-info-light';
      iconColor = 'text-info';
      icon = <InfoIcon className="!text-2xl" />;
      break;
    case 'warning':
      bgColor = 'bg-warning bg-opacity-20'; // no light color defin;
      iconColor = 'text-warning';
      icon = <ErrorIcon className="!text-2xl" />;
      break;
    case 'error':
      bgColor = 'bg-error-light';
      iconColor = 'text-error';
      icon = <ErrorIcon className="!text-2xl" />;
      break;
    case 'success':
      bgColor = 'bg-success-light';
      iconColor = 'text-success';
      icon = <CheckCircleIcon className="!text-2xl" />;
      break;
    case 'neutral':
      bgColor = 'bg-white';
      iconColor = 'text-info';
      icon = <InfoIcon className="!text-2xl" />;
      break;
    default:
      bgColor = 'bg-info-light';
      iconColor = 'text-info';
      icon = <InfoIcon className="!text-2xl" />;
  }

  const handleOnClose = (e: React.BaseSyntheticEvent) => {
    setOpen(false);
  };

  return (
    <div className={`${className} alert-banner ${bgColor}`}>
      <div className={`${contentClassName} alert-banner-content`}>
        <div className="alert-banner-content-wrapper">
          <span className={`alert-banner-icon ${iconColor}`}>{icon}</span>
          <div className="alert-banner-message">{message}</div>
        </div>
        {showClose && (
          <button className="alert-banner-close" aria-label={closeAriaLabel} onClick={handleOnClose}>
            <CloseIcon className="!text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
});

if (__DEV__) {
  AlertBanner.displayName = 'Alert-banner';
}
