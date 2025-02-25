import { Dialog, DialogBackdrop, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
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

  const onCloseHandler = () => {
    if (onClose) {
      onClose();
    }
  };

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
        <Dialog as="div" className="sk-modal-wrapper" onClose={onCloseHandler} {...rest} ref={modalRef}>
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
              <DialogBackdrop
                className="sk-modal-overlay"
                style={{ pointerEvents: disableCloseOutside ? 'none' : undefined }}
              />
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
              <Content className={cx('sk-modal-dialog', className)}>
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
              </Content>
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
