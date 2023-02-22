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
    dismissLabel?: string
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
}

export const ConfirmationDialogContextProvider: React.FC<ConfirmationDialogContextProviderProps> = (props) => {
  const { setShow, show, onHide } = useDialogShow();
  const [content, setContent] = React.useState<ConfirmDialogProps | null>();
  const resolver = React.useRef<any>();

  const handleShow = (
    title: string,
    message: string | JSX.Element,
    confirmLabel?: string,
    dismissLabel?: string
  ): Promise<boolean> => {
    setContent({
      title,
      message,
      confirmLabel: confirmLabel || 'Ja',
      dismissLabel: dismissLabel || 'Nej',
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

  return (
    <ConfirmationDialogContext.Provider value={dialogContext}>
      {props.children}

      {content && (
        <Dialog show={show} label={content.title}>
          <Dialog.Content>{content.message}</Dialog.Content>
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

if (__DEV__) {
  Dialog.displayName = 'Confirm';
}
