import { useLocalStorageValue } from '@react-hookz/web';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { __DEV__ } from '@sk-web-gui/utils';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
export interface AlertBannerProps {
  children?: React.ReactNode;
  className?: string;
  /** For example a max-width to match site content max-width */
  contentClassName?: string;
  /** For example a max-width override */
  contentType?: 'tab' | 'fold';
  childrenClassName?: string;
  severity?: 'neutral' | 'info' | 'warning' | 'error' | 'success';
  showClose?: boolean;
  fromDate?: Date;
  toDate?: Date;
  openAriaLabel?: string;
  closeAriaLabel?: string;
  dropDownIcon?: React.ReactNode;
}

export const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>((props, ref) => {
  const {
    children,
    className = '',
    contentClassName = '',
    childrenClassName = '',
    contentType = 'fold',
    severity = 'info',
    showClose = true,
    openAriaLabel = 'Öppna meddelandet',
    closeAriaLabel = 'Stäng meddelandet',
    fromDate,
    toDate,
    dropDownIcon,
  } = props;

  const localstorageKey = 'alert-banner-is-open';
  const { value: open, set: setOpen } = useLocalStorageValue(localstorageKey, {
    defaultValue: true,
    initializeWithValue: true,
  });

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
    case 'success':
      bgColor = 'bg-success-light';
      iconColor = 'text-success';
      break;
    case 'neutral':
      bgColor = 'bg-white';
      iconColor = 'text-info';
      break;
    default:
      bgColor = 'bg-info-light';
      iconColor = 'text-info';
  }

  const handleOnClose = () => {
    setOpen((val) => !val);
  };

  let banner;

  switch (contentType) {
    case 'tab':
      banner = (
        <div
          className={`${className} alert-banner transition-height duration-300 ${
            !open ? '!py-[0px] !px-sm max-h-0 overflow-hidden' : `${bgColor} max-h-fit`
          } `}
          onClick={!open ? handleOnClose : undefined}
          onKeyDown={
            !open
              ? (e) => {
                  if (e.code == 'Space' || e.code == 'Enter') handleOnClose();
                }
              : undefined
          }
          aria-expanded={!open ? false : undefined}
          role={!open ? 'button' : undefined}
          aria-label={!open ? openAriaLabel : undefined}
          tabIndex={!open ? 0 : undefined}
        >
          <div className={`${contentClassName} alert-banner-content`}>
            <div className="alert-banner-content-wrapper">
              <span
                className={`${
                  open ? 'open alert-banner-icon relative' : 'absolute tab z-20'
                } ${iconColor} transition-all duration-300`}
              >
                <ErrorIcon className={`!text-2xl`} />
              </span>
              {open && <div className={`${childrenClassName} alert-banner-children`}>{children}</div>}
            </div>
            {showClose && (
              <button
                className={`${open ? 'alert-banner-close' : 'hidden'}`}
                aria-label={open ? closeAriaLabel : openAriaLabel}
                onClick={handleOnClose}
              >
                <div className={`alert-banner-close-icon ${open ? 'open rotate-180' : ''}`}>
                  {dropDownIcon ? (
                    dropDownIcon
                  ) : open ? (
                    <CloseOutlinedIcon className={`!text-2xl`} />
                  ) : (
                    <AddOutlinedIcon className={`!text-2xl`} />
                  )}
                </div>
              </button>
            )}
          </div>
        </div>
      );
      break;
    case 'fold':
      banner = (
        <div
          className={`${className} alert-banner transition-height duration-300 ${bgColor} ${!open ? '!py-[2px]' : ''} `}
          onClick={!open ? handleOnClose : undefined}
          onKeyDown={
            !open
              ? (e) => {
                  if (e.code == 'Space' || e.code == 'Enter') handleOnClose();
                }
              : undefined
          }
          aria-expanded={!open ? false : undefined}
          role={!open ? 'button' : undefined}
          aria-label={!open ? openAriaLabel : undefined}
          tabIndex={!open ? 0 : undefined}
        >
          <div className={`${contentClassName} alert-banner-content transition-all`}>
            <div className="alert-banner-content-wrapper">
              <span className={`alert-banner-icon relative' ${iconColor}`}>
                <ErrorIcon className={`!text-2xl`} />
              </span>
              {open && <div className={`${childrenClassName} alert-banner-children`}>{children}</div>}
            </div>
            {showClose && (
              <button
                className={`${open ? 'alert-banner-close' : 'hidden'}`}
                aria-label={open ? openAriaLabel : closeAriaLabel}
                onClick={handleOnClose}
              >
                <div className={`alert-banner-close-icon ${open ? 'open rotate-180' : ''}`}>
                  {dropDownIcon ? dropDownIcon : open ? <CloseOutlinedIcon className={`!text-2xl`} /> : ''}
                </div>
              </button>
            )}
          </div>
        </div>
      );
      break;
    default:
      banner = (
        <div
          className={`${className} alert-banner transition-height duration-300 ${bgColor} ${!open ? '!py-[2px]' : ''} `}
          onClick={!open ? handleOnClose : undefined}
          onKeyDown={
            !open
              ? (e) => {
                  if (e.code == 'Space' || e.code == 'Enter') handleOnClose();
                }
              : undefined
          }
          aria-expanded={!open ? false : undefined}
          role={!open ? 'button' : undefined}
          aria-label={!open ? openAriaLabel : undefined}
          tabIndex={!open ? 0 : undefined}
        >
          <div className={`${contentClassName} alert-banner-content transition-all`}>
            <div className="alert-banner-content-wrapper">
              <span className={`alert-banner-icon relative' ${iconColor}`}>
                <ErrorIcon className={`!text-2xl`} />
              </span>
              {open && <div className={`${childrenClassName} alert-banner-children`}>{children}</div>}
            </div>
            {showClose && (
              <button
                className={`${open ? 'alert-banner-close' : 'hidden'}`}
                aria-label={open ? openAriaLabel : closeAriaLabel}
                onClick={handleOnClose}
              >
                <div className={`alert-banner-close-icon ${open ? 'open rotate-180' : ''}`}>
                  {dropDownIcon ? dropDownIcon : open ? <CloseOutlinedIcon className={`!text-2xl`} /> : ''}
                </div>
              </button>
            )}
          </div>
        </div>
      );
  }

  return <div>{banner}</div>;
});

if (__DEV__) {
  AlertBanner.displayName = 'AlertBanner';
}

export default AlertBanner;
