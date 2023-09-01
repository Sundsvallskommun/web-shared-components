import ErrorSharpIcon from '@mui/icons-material/ErrorSharp';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { Button } from '@sk-web-gui/button';
import { __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
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
        return <InfoSharpIcon fontSize="large" className={content?.dialogType ? `text-${content.dialogType}` : ``} />;
      case 'error':
        return <ErrorSharpIcon fontSize="large" className={content?.dialogType ? `text-${content.dialogType}` : ``} />;
      case 'question':
        return (
          <HelpOutlineSharpIcon fontSize="large" className={content?.dialogType ? `text-${content.dialogType}` : ``} />
        );
      default:
        return null;
    }
  };

  return (
    <ConfirmationDialogContext.Provider value={dialogContext}>
      {props.children}

      {content && (
        <Dialog
          aria-label={`${content.title} ${content.message}`}
          show={show}
          label={
            <span className="flex items-center justify-center gap-2">
              {switchIcon(content.icon)} {content.title}
            </span>
          }
          labelAs={content.labelAs}
          onClose={handleDismiss}
          className={content.dialogType ? `border-2 border-${content.dialogType}` : ``}
        >
          <Dialog.Content>
            {content.dialogType ? (
              <span className={`font-bold text-${content.dialogType}`}>{content.message}</span>
            ) : (
              <span>{content.message}</span>
            )}
          </Dialog.Content>
          <Dialog.Buttons>
            <Button onClick={handleDismiss}>{content.dismissLabel}</Button>
            <Button variant="solid" color="primary" onClick={handleConfirm}>
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
