import { Button } from '@sk-web-gui/button';
import { Icon, IconProps } from '@sk-web-gui/icon';
import { createToast, useToastOptions } from '@sk-web-gui/toast';
import { __DEV__, cx as clsx } from '@sk-web-gui/utils';
import React from 'react';

interface Status {
  [key: string]: {
    icon: IconProps['name'];
    cx: string;
  };
}

const statuses: Status = {
  primary: {
    icon: 'lightbulb',
    cx: 'sk-snackbar-primary',
  },
  info: {
    icon: 'lightbulb',
    cx: 'sk-snackbar-info',
  },
  success: {
    icon: 'check',
    cx: 'sk-snackbar-success',
  },
  warning: {
    icon: 'alert-triangle',
    cx: 'sk-snackbar-warning',
  },
  error: {
    icon: 'alert-circle',
    cx: 'sk-snackbar-error',
  },
};

type OmittedTypes = 'title' | 'closeIcon' | 'onUndo' | 'undoText' | 'description';

export interface SnackbarProps extends Omit<useToastOptions, OmittedTypes> {
  actionCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  leadingIcon?: boolean;
  action?: string;
}

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
  const {
    message,
    className,
    icon: CustomIcon,
    status = 'primary',
    closeable = true,
    leadingIcon = true,
    action = 'Stäng',
    actionCallback,
    onClose,
  } = props;
  const { icon, cx } = statuses[status] || {};
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useImperativeHandle<Partial<HTMLButtonElement>, Partial<HTMLButtonElement>>(ref, () => ({
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

  const handleActionCallback = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose && onClose();
    actionCallback && actionCallback(e);
  };

  return (
    <div
      className={clsx('sk-snackbar', className, cx)}
      ref={ref}
      style={{ width: `${window.innerWidth < 520 ? window.innerWidth - 10 : '520'}px` }}
    >
      <span className={clsx('sk-snackbar-content')}>
        {leadingIcon &&
          ((icon && cx) || CustomIcon) &&
          (CustomIcon ? (
            <CustomIcon />
          ) : (
            <Icon
              variant="ghost"
              inverted
              size="fit"
              name={icon as React.ComponentProps<typeof Icon>['name']}
              className={clsx('sk-snackbar-icon')}
            />
          ))}
        <span className={clsx('sk-snackbar-text')}>{message}</span>
      </span>
      {closeable && (
        <Button
          inverted
          ref={closeRef}
          size="sm"
          variant="ghost"
          onClick={handleActionCallback}
          className={clsx('sk-snackbar-action')}
        >
          {action}
        </Button>
      )}
    </div>
  );
});

if (__DEV__) {
  Snackbar.displayName = 'Snackbar';
}

export const useSnackbar = createToast(Snackbar);
export default useSnackbar;
