import { Dialog, Transition, _internal_ComponentDialog } from '@headlessui/react';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

export interface ModalComponentProps extends DefaultProps, Omit<_internal_ComponentDialog, 'displayName'> {
  show: boolean;
  label?: string | JSX.Element;
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
  overlayTransitionProps?: React.ComponentPropsWithRef<typeof Transition.Child>;
  contentTransitionProps?: React.ComponentPropsWithRef<typeof Transition.Child>;
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
        modalRef.current && modalRef.current.removeAttribute('aria-labelledby');
      });
    }
  }, [show, props['aria-label']]);

  return (
    <div className="sk-modal" ref={ref}>
      <Transition appear show={show} as={React.Fragment}>
        <Dialog ref={modalRef} as="div" className="sk-modal-wrapper" onClose={onCloseHandler} {...rest}>
          <div className="sk-modal-wrapper-inner">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-0"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              {...(typeof overlayTransitionProps === 'object' ? overlayTransitionProps : {})}
            >
              <Dialog.Overlay
                className="sk-modal-overlay"
                style={{ pointerEvents: disableCloseOutside ? 'none' : undefined }}
              />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
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
                      <Dialog.Title as={labelAs} className={'sk-modal-dialog-header-title'}>
                        {label}
                      </Dialog.Title>
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
                        <Icon name="x" />
                      </Button>
                    )}
                  </div>
                )}
                <>{children}</>
              </Content>
            </Transition.Child>
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
