import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';

export const PopupMenuGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'> & DefaultProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <div role="group" ref={ref} className={cx('sk-popup-menu-group', className)} {...rest} />;
  }
);
