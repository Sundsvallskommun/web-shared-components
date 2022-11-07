import { useLocalStorageValue } from '@react-hookz/web';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { __DEV__ } from '@sk-web-gui/utils';

interface AlertBannerProps {
  message: React.ReactNode;
  className?: string;
  /** For example a max-width to match site content max-width */
  contentClassName?: string;
  severity?: 'neutral' | 'info' | 'warning' | 'error';
  showClose?: boolean;
  fromDate?: Date;
  toDate?: Date;
  closeAriaLabel?: 'Stäng meddelandet';
}

export const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>((props, ref) => {
  const {
    message,
    className = '',
    contentClassName = '',
    severity = 'info',
    showClose = true,
    closeAriaLabel,
    fromDate,
    toDate,
  } = props;

  const localstorageKey = 'alert-banner-is-open';
  const [open, setOpen] = useLocalStorageValue(localstorageKey, true, {
    storeDefaultValue: true,
    initializeWithStorageValue: true,
  });

  if (!open) {
    return <></>;
  }

  if (fromDate && toDate) {
    const todayDate = new Date();
    if (todayDate < fromDate || toDate < todayDate) return <></>;
  }

  let bgColor, iconColor;

  switch (severity) {
    case 'info':
      bgColor = 'bg-info-light';
      iconColor = 'text-info';
      break;
    case 'warning':
      bgColor = 'bg-warning-light';
      iconColor = 'text-warning';
      break;
    case 'error':
      bgColor = 'bg-error-light';
      iconColor = 'text-error';
      break;
    case 'neutral':
      bgColor = 'bg-white';
      iconColor = 'text-info';
      break;
    default:
      bgColor = 'bg-info-light';
      iconColor = 'text-info';
  }

  const handleOnClose = (e: React.BaseSyntheticEvent) => {
    setOpen(false);
  };

  return (
    <div className={`${className} alert-banner ${bgColor}`}>
      <div className={`${contentClassName} alert-banner-content`}>
        <div className="alert-banner-content-wrapper">
          <span className={`alert-banner-icon ${iconColor}`}>
            <ErrorIcon className="!text-2xl" />
          </span>
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
