import React from 'react';
import { useDialogShow } from './use-dialog-show';
import { DialogContextType } from './types';
import { Lightbulb, CircleAlert, CircleHelp } from 'lucide-react';
import { Icon } from '@sk-web-gui/icon';
import { ConfirmationDialogContext } from './context';
import { Dialog } from '../dialog';
import { Button } from '@sk-web-gui/button';
import { __DEV__ } from '@sk-web-gui/utils';

export type ConfirmationDialogContextProviderProps = {
  children: React.ReactNode;
};

export interface ConfirmDialogProps {
  title: string;
  message: string | React.JSX.Element;
  confirmLabel?: string;
  dismissLabel?: string;
  dialogType?: 'warning' | 'error' | 'info';
  icon?: 'info' | 'error' | 'question';
  labelAs?: React.ElementType;
}

type Resolver = (value: boolean | PromiseLike<boolean>) => void;

export const ConfirmationDialogContextProvider: React.FC<ConfirmationDialogContextProviderProps> = (props) => {
  const { setShow, show, onHide } = useDialogShow();
  const [content, setContent] = React.useState<ConfirmDialogProps | null>();
  const resolver = React.useRef<Resolver | undefined>(undefined);

  const handleShow = (
    title: string,
    message: string | React.JSX.Element,
    confirmLabel?: string,
    dismissLabel?: string,
    dialogType?: 'warning' | 'error' | 'info',
    icon?: 'info' | 'error' | 'question',
    labelAs?: React.ElementType
  ): Promise<boolean> => {
    setContent({
      title,
      message,
      confirmLabel: confirmLabel || 'Ja',
      dismissLabel: dismissLabel || 'Nej',
      dialogType: dialogType,
      icon: icon,
      labelAs: labelAs || 'h1',
    });
    setShow(true);
    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const dialogContext: DialogContextType = {
    showConfirmation: handleShow,
  };

  const handleConfirm = () => {
    resolver.current?.(true);
    onHide();
  };

  const handleDismiss = () => {
    resolver.current?.(false);
    onHide();
  };

  const switchIcon = (parameter: string) => {
    switch (parameter) {
      case 'info':
        return <Icon rounded icon={<Lightbulb />} color={content?.dialogType} />;
      case 'error':
        return <Icon rounded icon={<CircleAlert />} color={content?.dialogType} />;
      case 'question':
        return <Icon rounded icon={<CircleHelp />} color={content?.dialogType} />;
      default:
        return null;
    }
  };

  const getIconLabel = () => {
    switch (content?.icon) {
      case 'info':
        return 'Information';
      case 'error':
        return 'Fel';
      case 'question':
        return 'Fråga';
      default:
        return undefined;
    }
  };

  return (
    <ConfirmationDialogContext.Provider value={dialogContext}>
      {props.children}

      {content && (
        <Dialog
          aria-label={`${getIconLabel()} ${content.title} ${content.message}`}
          show={show}
          label={
            <span className="sk-dialog-confirm-label" data-color={content.dialogType}>
              {switchIcon(content.icon || '')} {getIconLabel()}
            </span>
          }
          hideLabel={!content.icon}
          labelAs={content.labelAs}
          onClose={handleDismiss}
        >
          <Dialog.Content>
            <h1 className="sk-dialog-confirm-heading">{content.title}</h1>
            <p>{content.message}</p>
          </Dialog.Content>
          <Dialog.Buttons>
            <Button variant="secondary" onClick={handleDismiss}>
              {content.dismissLabel}
            </Button>
            <Button variant="primary" color={content?.dialogType || 'gronsta'} onClick={handleConfirm}>
              {content.confirmLabel}
            </Button>
          </Dialog.Buttons>
        </Dialog>
      )}
    </ConfirmationDialogContext.Provider>
  );
};

if (__DEV__) {
  Dialog.displayName = 'Confirm';
}
