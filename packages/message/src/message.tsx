import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { createToast, useToastOptions } from '@sk-web-gui/toast';
import { __DEV__, cx as clsx } from '@sk-web-gui/utils';
import * as React from 'react';

interface Status {
  [key: string]: {
    icon: any;
    cx: string;
  };
}

const statuses: Status = {
  info: {
    icon: 'info',
    cx: 'message-info',
  },
  success: {
    icon: 'check-circle-2',
    cx: 'message-success',
  },
  error: {
    icon: 'x-circle',
    cx: 'message-error',
  },
  warning: {
    icon: 'alert-circle',
    cx: 'message-warning',
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
  const { icon, cx } = statuses[status] || {};
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
        (customIcon ? customIcon : <Icon name={icon} className={clsx('message-icon')} />)}
      <span className={clsx('message-text')}>{message}</span>
      {closeable && (
        <Button
          ref={closeRef}
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCloseCallback}
          className="message-close-button"
          iconButton
          aria-label={closeAriaLabel}
        >
          <Icon variant="ghost" className="message-close-button-icon" name="x" />
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
