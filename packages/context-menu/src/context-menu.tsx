import { Menu } from '@headlessui/react';

import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { ContextMenuButton } from './context-menu-button';

export interface ContextMenuPropsInternal extends React.HTMLAttributes<HTMLDivElement>, DefaultProps {
  classNameItems?: string;
}

const ContextMenuComponent = React.forwardRef<HTMLDivElement, ContextMenuPropsInternal>((props, ref) => {
  const { className, classNameItems, children, ...rest } = props;

  const getButton = () => {
    return React.Children.toArray(children).find((child: any) => child?.type?.name === ContextMenuButton.name);
  };

  const getItems = () => {
    return React.Children.toArray(children).filter((child: any) => child?.type?.name !== ContextMenuButton.name);
  };

  return (
    <Menu as="div" ref={ref} className={cx('context-menu-wrapper', className)} {...rest}>
      {getButton()}
      <Menu.Items className={`context-menu-items ${classNameItems}`}>{getItems()}</Menu.Items>
    </Menu>
  );
});

interface ContextMenuItemProps {
  children: JSX.Element;
  className?: string;
  as?: React.ElementType;
  disabled?: boolean;
  onClick?: () => void;
}
const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ disabled = false, children, className, as = 'div' }) => {
  const getItem = (child: JSX.Element, active: boolean) => {
    const classes = cx(child?.props?.className, active ? 'active' : '');
    const props = { ...child.props, className: classes };
    return React.cloneElement(child, props);
  };

  return (
    <Menu.Item as={as} disabled={disabled} className={cx('context-menu-item', className)}>
      {({ active }) => getItem(children, active)}
    </Menu.Item>
  );
};

interface ContextMenuProps
  extends ContextMenuPropsInternal,
    React.ForwardRefExoticComponent<ContextMenuPropsInternal & React.RefAttributes<HTMLElement>> {
  Item: typeof ContextMenuItem;
  Button: typeof ContextMenuButton;
}

export const ContextMenu = ContextMenuComponent as ContextMenuProps;

ContextMenu.Item = ContextMenuItem;
ContextMenu.Button = ContextMenuButton;

if (__DEV__) {
  ContextMenu.displayName = 'Context menu';
}

export type { ContextMenuProps };
export default ContextMenu;
