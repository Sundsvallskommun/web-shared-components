import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';

interface IMenuVerticalHeaderProps extends DefaultProps {
  children: React.JSX.Element | React.JSX.Element[] | string;
}

export interface MenuVerticalHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'>,
    IMenuVerticalHeaderProps {}

export const MenuVerticalHeader = React.forwardRef<HTMLDivElement, IMenuVerticalHeaderProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div ref={ref} className={cx('sk-menu-vertical-header', className)} {...rest}>
      {children}
    </div>
  );
});
