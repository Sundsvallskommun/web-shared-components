import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';

interface IMenuVerticalToolItemProps extends DefaultProps {
  children: JSX.Element | JSX.Element[] | string;
}

export interface MenuVerticalToolItemProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'children'>,
    IMenuVerticalToolItemProps {}

export const MenuVerticalToolItem = React.forwardRef<HTMLSpanElement, IMenuVerticalToolItemProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <span ref={ref} className={cx('sk-menu-vertical-item-tool-item', className)} {...rest}>
      {children}
    </span>
  );
});
