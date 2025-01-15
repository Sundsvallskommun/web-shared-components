import { Button } from '@sk-web-gui/button';
import { Icon, IconProps } from '@sk-web-gui/icon';
import { useToastOptions } from '@sk-web-gui/toast';
import { __DEV__, cx as clsx } from '@sk-web-gui/utils';
import { Lightbulb, Check, AlertTriangle, AlertCircle } from 'lucide-react';
import React from 'react';

interface Status {
  [key: string]: {
    icon: React.ComponentProps<IconProps['Component']>['icon'];
    cx: string;
  };
}

const statuses: Status = {
  primary: {
    icon: <Lightbulb />,
    cx: 'sk-snackbar-primary',
  },
  info: {
    icon: <Lightbulb />,
    cx: 'sk-snackbar-info',
  },
  success: {
    icon: <Check />,
    cx: 'sk-snackbar-success',
  },
  warning: {
    icon: <AlertTriangle />,
    cx: 'sk-snackbar-warning',
  },
  error: {
    icon: <AlertCircle />,
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
      closeRef.current?.focus({
        preventScroll: true,
      });
    });
  };

  React.useEffect(() => {
    setInitialFocus();
  }, []);

  const handleActionCallback = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.();
    actionCallback?.(e);
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
            <Icon variant="ghost" inverted size="fit" icon={icon} className={clsx('sk-snackbar-icon')} />
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
