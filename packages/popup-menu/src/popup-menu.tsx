import { Menu } from '@headlessui/react';

import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { PopupMenuButton } from './popup-menu-button';

export interface PopupMenuPropsInternal extends React.HTMLAttributes<HTMLDivElement>, DefaultProps {
  classNameItems?: string;
  /**
   * @default 'left'
   */
  menuSide?: 'left' | 'right';
  size?: 'md' | 'sm';
}

const PopupMenuComponent = React.forwardRef<HTMLDivElement, PopupMenuPropsInternal>((props, ref) => {
  const { className, classNameItems, children, menuSide = 'left', size = 'medium', ...rest } = props;

  const getButton = () => {
    return React.Children.toArray(children).find((child: any) => child?.type?.name === PopupMenuButton.name);
  };

  const getItems = () => {
    return React.Children.toArray(children).filter((child: any) => child?.type?.name !== PopupMenuButton.name);
  };

  return (
    <Menu as="div" ref={ref} className={cx('sk-popup-menu-wrapper', className)} {...rest}>
      {getButton()}
      <Menu.Items className={`sk-popup-menu-items ${menuSide} ${classNameItems} sk-popup-menu-items-${size}`}>
        {getItems()}
      </Menu.Items>
    </Menu>
  );
});

interface PopupMenuItemProps {
  children: JSX.Element;
  className?: string;
  as?: React.ElementType;
  disabled?: boolean;
  onClick?: () => void;
}

//TODO: Add function for expandable menues.

const PopupMenuItem: React.FC<PopupMenuItemProps> = ({ disabled = false, children, className, as = 'div' }) => {
  const getItem = (child: JSX.Element, active: boolean) => {
    const classes = cx(child?.props?.className, active ? 'active' : '');
    const props = { ...child.props, className: classes };
    return React.cloneElement(child, props);
  };

  return (
    <Menu.Item as={as} disabled={disabled} className={cx('sk-popup-menu-item', className)}>
      {({ active }) => (
        <span className={cx('sk-popup-menu-item-content', active ? 'active' : '')}>{getItem(children, active)}</span>
      )}
    </Menu.Item>
  );
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
