import { cx } from '@sk-web-gui/utils';
import React from 'react';

export const ModalFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} className={cx('sk-modal-footer', className)} {...rest} />;
});
