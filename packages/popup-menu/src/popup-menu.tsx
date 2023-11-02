import { Menu } from '@headlessui/react';

import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { PopupMenuButton } from './popup-menu-button';

export interface PopupMenuPropsInternal extends React.HTMLAttributes<HTMLButtonElement>, DefaultProps {
  size?: 'md' | 'sm';
}

const PopupMenuComponent = React.forwardRef<HTMLButtonElement, PopupMenuPropsInternal>((props, ref) => {
  const { className, children, size = 'medium', ...rest } = props;

  const getButton = () => {
    const button = React.Children.toArray(children).find(
      (child: any) => child?.type?.name === PopupMenuButton.name
    ) as React.ReactElement;

    if (button) {
      return React.cloneElement(button, { ...button.props, ref, ...rest });
    } else {
      throw new Error('No PopupMenu.Button found');
    }
  };

  const getItems = () => {
    return React.Children.toArray(children).filter((child: any) => child?.type?.name !== PopupMenuButton.name);
  };

  return (
    <Menu>
      {getButton()}
      <Menu.Items className={`sk-popup-menu-items ${className} sk-popup-menu-items-${size}`}>{getItems()}</Menu.Items>
    </Menu>
  );
});

interface PopupMenuItemProps {
  children: JSX.Element;
  disabled?: boolean;
}

//TODO: Add function for expandable menues.

const PopupMenuItem: React.FC<PopupMenuItemProps> = ({ disabled = false, children }) => {
  const itemRef = React.useRef<HTMLElement>(null);

  const getItem = (child: JSX.Element, active: boolean) => {
    const classes = cx(child?.props?.className, active ? 'active' : '');
    const props = { ...child.props, className: cx('sk-popup-menu-item', classes), ref: itemRef };
    return React.cloneElement(child, props);
  };

  return <Menu.Item disabled={disabled}>{({ active }) => getItem(children, active)}</Menu.Item>;
};

interface PopupMenuProps
  extends PopupMenuPropsInternal,
    React.ForwardRefExoticComponent<PopupMenuPropsInternal & React.RefAttributes<HTMLElement>> {
  Item: typeof PopupMenuItem;
  Button: typeof PopupMenuButton;
}

export const PopupMenu = PopupMenuComponent as PopupMenuProps;

PopupMenu.Item = PopupMenuItem;
PopupMenu.Button = PopupMenuButton;

if (__DEV__) {
  PopupMenu.displayName = 'Popup menu';
}

export type { PopupMenuProps };
export default PopupMenu;
