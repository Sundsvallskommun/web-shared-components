import { cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { usePopupMenuItems } from './popup-menu-items';
import { usePopupMenu } from './popupmenu-context';

export interface PopupMenuItemProps {
  children: JSX.Element;
  disabled?: boolean;
  itemIndex?: number;
  panelIndex?: number;
  id?: string;
}

export const PopupMenuItem: React.FC<PopupMenuItemProps> = (props) => {
  const { children, disabled, id: _id } = props;
  const internalRef = React.useRef<HTMLSpanElement>(null);
  const autoId = React.useId();
  const { active, activeMode, next, prev, autoFocus } = usePopupMenuItems();
  const { close, isOpen, goTo, size } = usePopupMenu();

  const handleKeyboard = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();
        next && next();
        break;
      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();
        prev && prev();
        break;
      case 'Enter':
        event.target?.dispatchEvent(new MouseEvent('click'));
        close && close();
        break;
      case ' ':
        const target = event.target as Element;
        if (target?.nodeName?.toLowerCase() !== 'input') {
          event.preventDefault();
          event.stopPropagation();
          target.dispatchEvent(new MouseEvent('click'));
          close && close();
        }
        break;
    }
  };

  const getMenuItem = (): JSX.Element => {
    const mapItem = (item: React.ReactElement): React.ReactElement => {
      const id = item?.props?.id || _id || `sk-popup-menu-item-${autoId}`;
      const classes = cx('sk-popup-menu-item', item?.props?.className);

      const props = {
        onKeyDown: handleKeyboard,
        ref: internalRef,
        disabled: disabled,
        size,
        ...item.props,
        id: id,
        className: classes,
        tabIndex: active && active !== id ? -1 : 0,
      };

      return React.cloneElement(item, { ...props });
    };

    if (children.type === React.Fragment) {
      const grandchild = getValidChildren(children.props.children)[0];
      if (grandchild) {
        return mapItem(grandchild);
      }
    }
    return mapItem(children);
  };

  React.useEffect(() => {
    if (active === _id && activeMode === 'hard') {
      internalRef.current && internalRef.current.focus();
    }
  }, [active, goTo]);

  React.useEffect(() => {
    if (isOpen && autoFocus && active === _id) {
      internalRef.current && internalRef.current.focus();
    }
  }, [isOpen]);

  return <>{getMenuItem()}</>;
};
PopupMenuItem.displayName = 'PopupMenuItem';
