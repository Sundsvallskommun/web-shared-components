import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';

interface IMenuVerticalNavProps extends DefaultProps {
  children: React.ReactElement | React.ReactElement[] | string;
}

export interface MenuVerticalNavProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'>,
    IMenuVerticalNavProps {}

export const MenuVerticalNav = React.forwardRef<HTMLDivElement, IMenuVerticalNavProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <nav ref={ref} className={cx('sk-menu-vertical-nav', className)} {...rest}>
      {children}
    </nav>
  );
});
