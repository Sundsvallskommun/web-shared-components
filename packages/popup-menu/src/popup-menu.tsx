import { Menu } from '@headlessui/react';

import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { PopupMenuButton } from './popup-menu-button';

interface PopupMenuPropsInternal extends React.ComponentPropsWithRef<'button'>, DefaultProps {
  size?: 'md' | 'sm';
  position?: 'under' | 'over' | 'left' | 'right';
  align?: 'start' | 'end';
}

const PopupMenuComponent = React.forwardRef<HTMLButtonElement, PopupMenuPropsInternal>((props, ref) => {
  const { className, children, size = 'md', position = 'under', align = 'start', ...rest } = props;

  const getButton = () => {
    const button = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) && typeof child.type !== 'string' && child?.type?.name === PopupMenuButton.name
    ) as React.ReactElement;

    if (button) {
      return React.cloneElement(button, { ...button.props, ref, ...rest });
    } else {
      throw new Error('No PopupMenu.Button found');
    }
  };

  const getItems = () => {
    return React.Children.toArray(children).filter(
      (child) =>
        React.isValidElement(child) && typeof child.type !== 'string' && child?.type?.name !== PopupMenuButton.name
    );
  };

  return (
    <Menu>
      {getButton()}
      <Menu.Items
        className={cx('sk-popup-menu-items', className, `sk-popup-menu-items-${size}`)}
        data-position={position}
        data-align={align}
      >
        {getItems()}
      </Menu.Items>
    </Menu>
  );
});

interface PopupMenuItemProps {
  children: JSX.Element;
  disabled?: boolean;
}

//TODO: Add function for expandable menues.

const PopupMenuItem: React.FC<PopupMenuItemProps> = ({ disabled = false, children }) => {
  const getItem = (child: JSX.Element, active: boolean) => {
    const classes = cx(child?.props?.className, active ? 'active' : '');
    const props = { ...child.props, className: cx('sk-popup-menu-item', classes) };
    return React.cloneElement(child, props);
  };

  return <Menu.Item disabled={disabled}>{({ active }) => getItem(children, active)}</Menu.Item>;
};

const PopupMenuGroup: React.FC<React.ComponentPropsWithRef<'div'> & DefaultProps> = (props) => {
  const { className, ...rest } = props;

  return <div role="group" className={cx('sk-popup-menu-items-group', className)} {...rest} />;
};

interface PopupMenuProps extends React.ForwardRefExoticComponent<PopupMenuPropsInternal> {
  Component: typeof PopupMenuComponent;
  Item: typeof PopupMenuItem;
  Button: typeof PopupMenuButton;
  Group: typeof PopupMenuGroup;
}

const PopupMenu = {
  ...PopupMenuComponent,
  Component: PopupMenuComponent,
  Item: PopupMenuItem,
  Button: PopupMenuButton,
  Group: PopupMenuGroup,
} as PopupMenuProps;

if (__DEV__) {
  PopupMenu.displayName = 'PopupMenu';
}

export { PopupMenu };
export type { PopupMenuProps };
export default PopupMenu;
