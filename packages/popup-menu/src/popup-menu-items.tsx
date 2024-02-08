import { cx, getValidChildren, useForkRef } from '@sk-web-gui/utils';
import React, { cloneElement } from 'react';
import { PopupMenuItem } from './popup-menu-item';
import { usePopupMenu } from './popupmenu-context';

interface PopupMenuItemsContextProps {
  next?: () => void;
  prev?: () => void;
  active?: string;
  activeMode?: 'soft' | 'hard';
  autoFocus?: boolean;
}

const PopupMenuItemsContext = React.createContext<PopupMenuItemsContextProps>({});
export const usePopupMenuItems = () => React.useContext(PopupMenuItemsContext);

interface PopupMenuItemsProps extends React.ComponentPropsWithoutRef<'div'> {
  autoFocus?: boolean;
}

export const PopupMenuItems = React.forwardRef<HTMLDivElement, PopupMenuItemsProps>((props, ref) => {
  const { className, children, id: _id, autoFocus = true, ...rest } = props;
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [activeMode, setActiveMode] = React.useState<'soft' | 'hard'>('hard');
  const internalRef = React.useRef<HTMLDivElement>(null);
  const [panels, setPanels] = React.useState<string[]>([]);
  const active = panels[activeIndex];
  const autoId = React.useId();
  const { goTo, isOpen, id: parentId, buttonId } = usePopupMenu();

  const id = _id || `${parentId}-items-${autoId}`;

  const menuItems = React.useMemo(() => {
    let total = 0;

    const mapKids = (kids: React.ReactNode): React.ReactNode => {
      const validChildren = getValidChildren(kids);
      let newChildren: React.ReactNode = [];

      for (let index = 0; index < validChildren.length; index++) {
        const child = validChildren[index];

        switch (child.type) {
          case PopupMenuItem:
            const itemIndex = total;
            total++;
            const childId = child?.props?.id || `${id}-${itemIndex}`;
            setPanels((panels) => [...panels, childId]);
            newChildren = [...newChildren, cloneElement(child, { ...child.props, id: childId, itemIndex: itemIndex })];
            break;
          default:
            if (child.props.children) {
              const newKids = mapKids(child.props.children);
              newChildren = [...newChildren, React.cloneElement(child, { ...child.props, children: newKids })];
              break;
            }
            newChildren = [...newChildren, child];
            break;
        }
      }

      return newChildren;
    };
    setActiveMode('soft');
    setActiveIndex(0);
    setPanels([]);
    const newChildren = mapKids(children);

    return newChildren;
  }, [children]);

  React.useEffect(() => {
    if (!isOpen) {
      setActiveMode('hard');
      setActiveIndex(0);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (internalRef.current) {
      walkItems(internalRef.current.children);
    }
  }, [internalRef]);

  const walkItems = (items: HTMLCollection) => {
    Array.from(items).forEach((child) => {
      mapItem(child);
    });
  };

  React.useEffect(() => {
    setActiveMode('hard');
    switch (goTo) {
      case 'first':
        setActiveIndex(0);
        break;
      case 'last':
        setActiveIndex(panels.length - 1);
        break;
      default:
        break;
    }
  }, [goTo]);

  const mapItem = (item: Element) => {
    const tabIndex = item.getAttribute('id') === active ? '0' : '-1';
    switch (item.nodeName.toLowerCase()) {
      case 'button':
        item.setAttribute('role', 'menuitem');
        item.setAttribute('tabIndex', tabIndex);
        break;
      case 'a':
        item.setAttribute('role', 'menuitem');
        item.setAttribute('tabIndex', tabIndex);
        break;

      case 'input': {
        item.setAttribute('tabIndex', tabIndex);
        handleInput(item);
        break;
      }
      default:
        if (item.children) {
          walkItems(item.children);
        }
        break;
    }
  };

  const handleInput = (item?: Element): string | undefined => {
    if (!item) {
      return undefined;
    }
    const type = item.getAttribute('type')?.toLowerCase();
    switch (type) {
      case 'checkbox':
        item.setAttribute('role', 'menuitemcheckbox');
        break;
      case 'radio':
        item.setAttribute('role', 'menuitemradio');
        break;
      default:
        return undefined;
    }
    // }
    return undefined;
  };

  const next = () => {
    setActiveMode('hard');
    if (activeIndex === panels.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };
  const prev = () => {
    setActiveMode('hard');
    if (activeIndex === 0) {
      setActiveIndex(panels.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const context = {
    active,
    next,
    prev,
    autoFocus,
    activeMode,
  };
  return (
    <PopupMenuItemsContext.Provider value={context}>
      <div
        ref={useForkRef(ref, internalRef)}
        className={cx('sk-popup-menu-items', className)}
        role="menu"
        id={id}
        aria-labelledby={buttonId}
        {...rest}
      >
        {menuItems}
      </div>
    </PopupMenuItemsContext.Provider>
  );
});
