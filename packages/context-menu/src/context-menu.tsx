import { Menu } from '@headlessui/react';

import { DefaultProps } from '@sk-web-gui/theme';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { ContextMenuButton } from './context-menu-button';

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement>, DefaultProps {}

const ContextMenuComponent = React.forwardRef<HTMLDivElement, ContextMenuProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const getButton = () => {
    return React.Children.toArray(children).find((child: any) => child?.type?.name === 'ContextMenuButton');
  };

  const getItems = () => {
    return React.Children.toArray(children).filter((child: any) => child?.type?.name === 'ContextMenuItem');
  };

  return (
    <Menu as="div" ref={ref} className={cx('context-menu-wrapper', className)} {...rest}>
      {getButton()}
      <Menu.Items className={`context-menu-items`}>{getItems()}</Menu.Items>
    </Menu>
  );
});

const ContextMenuItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <Menu.Item as="div" className={cx('context-menu-item', className)}>
    {children}
  </Menu.Item>
);

interface ContextMenu extends React.ForwardRefExoticComponent<ContextMenuProps & React.RefAttributes<HTMLElement>> {
  Item: typeof ContextMenuItem;
  Button: typeof ContextMenuButton;
}

export const ContextMenu = ContextMenuComponent as ContextMenu;

ContextMenu.Item = ContextMenuItem;
ContextMenu.Button = ContextMenuButton;

if (__DEV__) {
  ContextMenu.displayName = 'Context menu';
}

export default ContextMenu;
