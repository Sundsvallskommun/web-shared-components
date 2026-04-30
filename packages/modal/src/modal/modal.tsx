import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { X } from 'lucide-react';

export interface ModalComponentProps
  extends DefaultProps,
    Omit<React.ComponentPropsWithRef<typeof Dialog>, 'displayName' | 'onClose' | 'unmount'> {
  show: boolean;
  label?: string | React.JSX.Element;
  closeLabel?: string;
  className?: string;
  onClose?: () => void;
  hideClosebutton?: boolean;
  closeButtonProps?: React.ComponentProps<typeof Button>;
  children?: React.ReactNode;
  disableCloseOutside?: boolean;
  /**
   * @default article
   */
  as?: React.ElementType;
  /**
   * @deafult label
   */
  labelAs?: React.ElementType;
  hideLabel?: boolean;
  'aria-label'?: string;
  overlayTransitionProps?: React.ComponentPropsWithRef<typeof TransitionChild>;
  contentTransitionProps?: React.ComponentPropsWithRef<typeof TransitionChild>;
}

export const ModalComponent = React.forwardRef<HTMLDivElement, ModalComponentProps>((props, ref) => {
  const {
    show,
    label,
    closeLabel,
    className,
    hideClosebutton = false,
    onClose,
    children,
    disableCloseOutside = false,
    as: Content = 'article',
    labelAs = 'label',
    hideLabel = false,
    closeButtonProps,
    overlayTransitionProps,
    contentTransitionProps,
    ...rest
  } = props;

  const modalRef = React.useRef<HTMLDivElement>(null);
  const closeFromEscapeRef = React.useRef(false);

  const onCloseHandler = () => {
    if (onClose) {
      onClose();
    }
  };

  const onDialogCloseHandler = () => {
    if (disableCloseOutside && !closeFromEscapeRef.current) {
      return;
    }

    closeFromEscapeRef.current = false;
    onCloseHandler();
  };

  React.useEffect(() => {
    if (!show || typeof window === 'undefined') {
      return;
    }

    const onWindowKeyDownCapture = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFromEscapeRef.current = true;

        // Reset the marker after this event loop to avoid stale escape state.
        window.setTimeout(() => {
          closeFromEscapeRef.current = false;
        }, 0);
      }
    };

    window.addEventListener('keydown', onWindowKeyDownCapture, true);

    return () => {
      window.removeEventListener('keydown', onWindowKeyDownCapture, true);
    };
  }, [show]);

  React.useEffect(() => {
    if (show && props['aria-label']) {
      setTimeout(() => {
        modalRef.current?.removeAttribute('aria-labelledby');
      });
    }
  }, [show, props['aria-label']]);

  return (
    <div className="sk-modal" ref={ref}>
      <Transition appear show={show} as={React.Fragment}>
        <Dialog as="div" className="sk-modal-wrapper" onClose={onDialogCloseHandler} {...rest} ref={modalRef}>
          <div className="sk-modal-wrapper-inner">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-0"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              {...(typeof overlayTransitionProps === 'object' ? overlayTransitionProps : {})}
            >
              <DialogBackdrop className="sk-modal-overlay" />
            </TransitionChild>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="sk-modal-trixter" aria-hidden="true">
              &#8203;
            </span>
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-0"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              {...(typeof contentTransitionProps === 'object' ? contentTransitionProps : {})}
            >
              <DialogPanel as={Content} className={cx('sk-modal-dialog', className)}>
                {(!hideLabel || !hideClosebutton) && (
                  <div className="sk-modal-dialog-header">
                    {!hideLabel ? (
                      <DialogTitle as={labelAs} className={'sk-modal-dialog-header-title'}>
                        {label}
                      </DialogTitle>
                    ) : (
                      <div className="grow" />
                    )}

                    {!hideClosebutton && (
                      <Button
                        className="sk-modal-dialog-close"
                        variant="tertiary"
                        iconButton
                        showBackground={false}
                        size="sm"
                        aria-label={
                          closeLabel ? closeLabel : `Stäng ${label && label !== typeof 'object' ? label : 'modal'}`
                        }
                        onClick={onCloseHandler}
                        {...closeButtonProps}
                      >
                        <Icon icon={<X />} />
                      </Button>
                    )}
                  </div>
                )}
                <>{children}</>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
});

if (__DEV__) {
  ModalComponent.displayName = 'ModalComponent';
}

export default ModalComponent;
