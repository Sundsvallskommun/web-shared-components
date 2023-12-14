import { DefaultProps } from '@sk-web-gui/utils';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { ModalFooter } from '../modal/modal-footer';

interface DialogButtonsProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {}

export const DialogButtons = React.forwardRef<HTMLDivElement, DialogButtonsProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <ModalFooter ref={ref} className={cx('sk-dialog-buttons', className)} {...rest}>
      {children}
    </ModalFooter>
  );
});

export default DialogButtons;
