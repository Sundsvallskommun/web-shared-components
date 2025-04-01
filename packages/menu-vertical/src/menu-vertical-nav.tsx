import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { MenuVerticalContext, UseMenuVerticalPropsStates } from './context';
import MenuVertical from '.';

interface IMenuVerticalNavProps extends DefaultProps {
  children: React.ReactElement | React.ReactElement[] | string;
  
}

export interface MenuVerticalNavProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'>,
    IMenuVerticalNavProps {}

export const MenuVerticalNav = React.forwardRef<HTMLDivElement, IMenuVerticalNavProps>((props, ref) => {
  const { className, children, ...rest } = props;
  const { menuAriaLabel } = React.useContext(MenuVerticalContext);

  return (
    <nav ref={ref} className={cx('sk-menu-vertical-nav', className)} aria-label={menuAriaLabel} {...rest}>
      {children}
    </nav>
  );
});
