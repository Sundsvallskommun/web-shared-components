import { Menu } from '@headlessui/react';

import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { ContextMenuButton } from './context-menu-button';

export interface ContextMenuPropsInternal extends React.ComponentPropsWithRef<'div'>, DefaultProps {
  classNameItems?: string;
  /**
   * @default left
   */
  menuSide?: 'left' | 'right';
}

const ContextMenuComponent = React.forwardRef<HTMLDivElement, ContextMenuPropsInternal>((props, ref) => {
  const { className, classNameItems, children, menuSide = 'left', ...rest } = props;

  const getButton = () => {
    return React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) && typeof child.type !== 'string' && child?.type?.name === ContextMenuButton.name
    );
  };

  const getItems = () => {
    return React.Children.toArray(children).filter(
      (child) =>
        React.isValidElement(child) && typeof child.type !== 'string' && child?.type?.name !== ContextMenuButton.name
    );
  };

  return (
    <Menu as="div" ref={ref} className={cx('context-menu-wrapper', className)} {...rest}>
      {getButton()}
      <Menu.Items className={`context-menu-items ${menuSide} ${classNameItems}`}>{getItems()}</Menu.Items>
    </Menu>
  );
});

interface ContextMenuItemProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode;
  as?: React.ElementType;
  disabled?: boolean;
  onClick?: () => void;
}
const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ disabled = false, children, className, as = 'div' }) => {
    const getItem = (child: ContextMenuItemProps['children'], active: boolean) => {
      if (React.isValidElement(child)) {
        const classes = cx(child?.props?.className, active ? 'active' : '');
        const props = { ...child.props, className: classes };
        return React.cloneElement(child, props);
      }
      return <>{child}</>;
    };

    return (
      <Menu.Item as={as} disabled={disabled} className={cx('context-menu-item', className)}>
        {({ active }) => getItem(children, active)}
      </Menu.Item>
    );
  }
);

interface ContextMenuProps extends React.ForwardRefExoticComponent<ContextMenuPropsInternal> {
  Component: typeof ContextMenuComponent;
  Item: typeof ContextMenuItem;
  Button: typeof ContextMenuButton;
}

export const ContextMenu = {
  ...ContextMenuComponent,
  Component: ContextMenuComponent,
  Item: ContextMenuItem,
  Button: ContextMenuButton,
} as ContextMenuProps;

if (__DEV__) {
  ContextMenu.displayName = 'ContextMenu';
}

export type { ContextMenuProps };
export default ContextMenu;
