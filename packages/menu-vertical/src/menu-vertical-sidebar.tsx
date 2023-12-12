import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';

interface IMenuVerticalSidebarProps extends DefaultProps {
  children: React.ReactElement | React.ReactElement[] | string;
}

export interface MenuVerticalSidebarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'>,
    IMenuVerticalSidebarProps {}

export const MenuVerticalSidebar = React.forwardRef<HTMLDivElement, IMenuVerticalSidebarProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <nav ref={ref} className={cx('sk-menu-vertical-sidebar', className)} {...rest}>
      {children}
    </nav>
  );
});
