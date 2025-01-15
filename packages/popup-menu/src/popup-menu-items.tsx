import { cx, getValidChildren, useForkRef } from '@sk-web-gui/utils';
import React, { cloneElement } from 'react';
import { PopupMenuItem } from './popup-menu-item';
import { GoTo, usePopupMenu } from './popupmenu-context';
import { PopupMenuItemsContext } from './context';

interface PopupMenuItemsProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * If items inside should be autofocused on open
   * Will focus first item on 'Enter' and 'ArrowDown', last item on 'ArrowUp'
   * @default true
   */
  autoFocus?: boolean;
}

export const PopupMenuItems = React.forwardRef<HTMLDivElement, PopupMenuItemsProps>((props, ref) => {
  const { className, children, id: _id, autoFocus = true, ...rest } = props;
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [activeMode, setActiveMode] = React.useState<'soft' | 'hard'>('soft');
  const [navigate, setNavigate] = React.useState<boolean>(false);
  const internalRef = React.useRef<HTMLDivElement>(null);
  const [panels, setPanels] = React.useState<string[]>([]);
  const [opened, setOpened] = React.useState<boolean>(false);
  const active = panels[activeIndex];
  const autoId = React.useId();
  const { goTo, setGoTo, isOpen, id: parentId, buttonId } = usePopupMenu();

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
            if (!child.props.disabled) {
              const itemIndex = total;
              const childId = child?.props?.id || `${id}-${itemIndex}`;
              setPanels((panels) => [...panels, childId]);
              newChildren = [
                ...newChildren,
                cloneElement(child, { ...child.props, id: childId, itemIndex: itemIndex }),
              ];
              total++;
            } else {
              newChildren = [...newChildren, child];
            }
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

    const newChildren = mapKids(children);

    return newChildren;
  }, [children, active, activeMode]);

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

  const handleGoTo = () => {
    switch (goTo) {
      case GoTo.First:
        setActiveIndex(0);
        break;
      case GoTo.Last:
        setActiveIndex(panels.length - 1);
        break;
      default:
        setActiveIndex(0);
        break;
    }
    setNavigate(true);
    setGoTo?.(undefined);
  };

  React.useEffect(() => {
    setActiveMode('soft');
    if (isOpen) {
      if (autoFocus && goTo) {
        setActiveMode('hard');
        handleGoTo();
      }
      setOpened(true);
    } else {
      setOpened(false);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (goTo && opened) {
      setActiveMode('hard');
      handleGoTo();
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
    return undefined;
  };

  const next = () => {
    setActiveMode('hard');
    if (activeIndex === panels.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
    setNavigate(true);
  };

  const prev = () => {
    setActiveMode('hard');
    if (activeIndex === 0) {
      setActiveIndex(panels.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
    setNavigate(true);
  };

  const context = {
    active,
    next,
    prev,
    activeMode,
    navigate,
    setNavigate,
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
        {menuItems &&
          getValidChildren(menuItems).map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)}
      </div>
    </PopupMenuItemsContext.Provider>
  );
});
