import ErrorSharpIcon from '@mui/icons-material/ErrorSharp';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { Dialog } from '../dialog';

type UseDialogShowReturnType = {
  show: boolean;
  setShow: (value: boolean) => void;
  onHide: () => void;
};

const useDialogShow = (): UseDialogShowReturnType => {
  const [show, setShow] = React.useState(false);

  const handleOnHide = () => {
    setShow(false);
  };

  return {
    show,
    setShow,
    onHide: handleOnHide,
  };
};

type DialogContextType = {
  showConfirmation: (
    title: string,
    message: string | JSX.Element,
    confirmLabel?: string,
    dismissLabel?: string,
    dialogType?: 'warning' | 'error' | 'info',
    icon?: 'info' | 'error' | 'question',
    labelAs?: React.ElementType
  ) => Promise<boolean>;
};

type ConfirmationDialogContextProviderProps = {
  children: React.ReactNode;
};

const ConfirmationDialogContext = React.createContext<DialogContextType>({} as DialogContextType);

interface ConfirmDialogProps {
  title: string;
  message: string | JSX.Element;
  confirmLabel?: string;
  dismissLabel?: string;
  dialogType?: 'warning' | 'error' | 'info';
  icon?: 'info' | 'error' | 'question';
  labelAs?: React.ElementType;
}

export const ConfirmationDialogContextProvider: React.FC<ConfirmationDialogContextProviderProps> = (props) => {
  const { setShow, show, onHide } = useDialogShow();
  const [content, setContent] = React.useState<ConfirmDialogProps | null>();
  const resolver = React.useRef<any>();

  const handleShow = (
    title: string,
    message: string | JSX.Element,
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
    resolver.current && resolver.current(true);
    onHide();
  };

  const handleDismiss = () => {
    resolver.current && resolver.current(false);
    onHide();
  };

  const switchIcon = (parameter: any) => {
    switch (parameter) {
      case 'info':
        return <Icon rounded name="lightbulb" color={content?.dialogType} />;
      case 'error':
        return <Icon rounded name="alert-circle" color={content?.dialogType} />;
      case 'question':
        return <Icon rounded name="help-circle" color={content?.dialogType} />;
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
            <span
              className={cx(`text-${content.dialogType || 'dark-primary'}`, 'flex items-center justify-start gap-4')}
            >
              {switchIcon(content.icon)} {getIconLabel()}
            </span>
          }
          hideLabel={!content.icon}
          labelAs={content.labelAs}
          onClose={handleDismiss}
        >
          <Dialog.Content>
            <h1 className={cx('text-h3')}>{content.title}</h1>
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

const useConfirm = (): DialogContextType => React.useContext(ConfirmationDialogContext);

export { useConfirm, useDialogShow };
export default useConfirm;

if (__DEV__) {
  Dialog.displayName = 'Confirm';
}
