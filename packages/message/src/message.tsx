import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button } from '@sk-web-gui/button';
import { CheckCircleIcon, ExclamationIcon, Icon, InfoIcon, XCricleIcon } from '@sk-web-gui/icon';
import { createToast, useToastOptions } from '@sk-web-gui/toast';
import { cx as clsx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

interface Status {
  [key: string]: {
    icon: any;
    cx: string;
    label: string;
  };
}

const statuses: Status = {
  info: {
    icon: InfoIcon,
    cx: 'message-info',
    label: 'info',
  },
  success: {
    icon: CheckCircleIcon,
    cx: 'message-success',
    label: 'check-circle',
  },
  error: {
    icon: XCricleIcon,
    cx: 'message-error',
    label: 'x-circle',
  },
  warning: {
    icon: ExclamationIcon,
    cx: 'message-warning',
    label: 'exclamationIcon',
  },
};

type OmittedTypes = 'title' | 'closeIcon' | 'onUndo' | 'undoText' | 'description';

export interface MessageProps extends Omit<useToastOptions, OmittedTypes> {
  /* Aria-label for close button */
  closeAriaLabel?: string;
  /* close callback */
  closeCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Message = React.forwardRef<any, MessageProps>((props, ref) => {
  const {
    message,
    className,
    icon: customIcon,
    status = '',
    closeable = true,
    closeAriaLabel,
    closeCallback,
    onClose,
  } = props;
  const { icon, cx, label } = statuses[status] || {};
  const closeRef = React.useRef<any>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      closeRef?.current?.focus({
        preventScroll: true,
      });
    },
  }));

  const setInitialFocus = () => {
    setTimeout(() => {
      closeRef.current &&
        closeRef.current.focus({
          preventScroll: true,
        });
    });
  };

  React.useEffect(() => {
    setInitialFocus();
  }, []);

  const handleCloseCallback = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose && onClose();
    closeCallback && closeCallback(e);
  };

  return (
    <div
      className={clsx('message', className, cx)}
      ref={ref}
      style={{ width: `${window.innerWidth < 520 ? window.innerWidth - 10 : '520'}px` }}
    >
      {((icon && cx) || customIcon) &&
        (customIcon ? customIcon : <Icon as={icon} label={label} className={clsx('message-icon')} />)}
      <span className={clsx('message-text')}>{message}</span>
      {closeable && (
        <Button
          ref={closeRef}
          type="button"
          size="lg"
          onClick={handleCloseCallback}
          className="message-close-button"
          iconButton
          aria-label={closeAriaLabel}
        >
          <CloseOutlinedIcon className="message-close-button-icon" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
});

if (__DEV__) {
  Message.displayName = 'Message';
}

export const useMessage = createToast(Message);
export default useMessage;
