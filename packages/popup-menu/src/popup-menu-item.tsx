import { cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import PopupMenu from '.';
import { PopupMenuButton } from './popup-menu-button';
import { usePopupMenu } from './popupmenu-context';
import { usePopupMenuItems } from './use-popup-menu-items';

export interface PopupMenuItemProps {
  children: JSX.Element;
  disabled?: boolean;
  id?: string;
  /**
   * @default true
   */
  closeOnClick?: boolean;
}

export const PopupMenuItem: React.FC<PopupMenuItemProps> = (props) => {
  const { children, disabled, id: _id, closeOnClick = true } = props;
  const autoId = React.useId();
  const id = _id || `sk-popup-menu-item-${autoId}`;
  const { active, navigate, setNavigate, activeMode, next, prev } = usePopupMenuItems();
  const { close, size } = usePopupMenu();

  const handleKeyboard = (
    event: KeyboardEvent,
    preventClose: boolean,
    defaultFunc?: (event: KeyboardEvent) => void
  ) => {
    const target = event.target as Element;
    const clickEvent = new MouseEvent('click', { bubbles: true });

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();
        next?.();
        break;
      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();
        prev?.();
        break;
      case 'Enter':
        target?.dispatchEvent(clickEvent);
        if (!preventClose) {
          close?.();
        }
        break;
      case ' ':
        if (target?.nodeName !== 'INPUT') {
          event.stopPropagation();
          event.preventDefault();
          target.dispatchEvent(clickEvent);
        }
        break;
    }
    defaultFunc?.(event);
  };

  const handleClick = (event: MouseEvent, preventClose: boolean, defaultFunc?: (event: MouseEvent) => void) => {
    const target = event.target as Element;
    if (!preventClose && target?.nodeName !== 'INPUT') {
      event.preventDefault();
      event.stopPropagation();
      close?.();
      event.target?.dispatchEvent(new MouseEvent('click'));
    }
    defaultFunc?.(event);
  };

  const menuItem = React.useMemo(() => {
    const mapItem = (item: React.ReactElement, preventClose: boolean): React.ReactElement => {
      const classes = cx('sk-popup-menu-item', item?.props?.className);

      const props = {
        disabled: disabled,
        size,
        ...item.props,
        onKeyDown: (event: KeyboardEvent) => handleKeyboard(event, preventClose, item.props.onKeyDown),
        onClick: (event: MouseEvent) => handleClick(event, preventClose, item.props.onClick),
        id: id,
        className: classes,
        tabIndex: active && active !== id ? -1 : 0,
      };

      return React.cloneElement(item, { ...props });
    };

    if (children.type === React.Fragment) {
      const grandchild = getValidChildren(children.props.children)[0];
      if (grandchild) {
        return mapItem(grandchild, !closeOnClick);
      }
    }
    if (children.type === PopupMenu) {
      const grandchildren = getValidChildren(children.props.children).map((child) => {
        return child.type === PopupMenuButton ? mapItem(child, true) : child;
      });
      const popupmenu = React.cloneElement(children, {
        ...children.props,
        position: children.props.position || 'right',
        autoPosition: children.props.autoPosition !== undefined ? children.props : true,
        children: grandchildren,
      });

      return <div className="sk-popup-menu-item-submenu-wrapper">{popupmenu}</div>;
    }
    return mapItem(children, !closeOnClick);
  }, [children, active]);

  React.useEffect(() => {
    if (active === id && activeMode === 'hard' && navigate) {
      document.getElementById(id)?.focus();
      setNavigate?.(false);
    }
  }, [active, activeMode, navigate]);

  return <>{menuItem} </>;
};
PopupMenuItem.displayName = 'PopupMenuItem';
