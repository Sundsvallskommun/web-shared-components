import { __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { PopupMenuButton } from './popup-menu-button';
import { PopupMenuPanel } from './popup-menu-panel';
import { GoTo, PopupMenuContext } from './popupmenu-context';

export interface PopupMenuBaseProps {
  /**
   * Size of popup. Does not affect button size
   * @default md
   */
  size?: 'md' | 'sm';
  /**
   * Position of the popup relative to the button.
   * @default under
   */
  position?: 'under' | 'over' | 'left' | 'right';
  /**
   * Alignment of the popup relative to the button.
   * @default start
   */
  align?: 'start' | 'end';
  /**
   * Type of popup.
   */
  type?: 'dialog' | 'menu';
}

export interface PopupMenuComponentProps extends PopupMenuBaseProps {
  /**
   * PopupMenu.Button & PopupMenu.Panel
   */
  children: [React.ReactComponentElement<typeof PopupMenuButton>, React.ReactComponentElement<typeof PopupMenuPanel>];
  // children: React.ReactNode;
  id?: string;
}

export const PopupMenuComponent: React.FC<PopupMenuComponentProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [goTo, setGoTo] = React.useState<GoTo | undefined>();
  const [buttonId, setButtonId] = React.useState<string>();
  const [hasItems, setHasItems] = React.useState<boolean>(false);
  const {
    // className,
    children,
    size = 'md',
    position = 'under',
    align = 'start',
    type: _type,
    id: _id,
  } = props;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  // const focusRef = React.useRef<HTMLElement>(null);
  const internalRef = React.useRef<HTMLDivElement>(null);
  const autoId = React.useId();

  const id = _id || `sk-popup-menu-${autoId}`;
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  useOnClickOutside(internalRef, (event: MouseEvent) => {
    const target = event.target as Node;
    const isOutsideButton = buttonRef.current && !buttonRef.current.contains(target);
    if (isOutsideButton) {
      close();
    }
  });

  const type = _type || ((hasItems ? undefined : 'dialog') as PopupMenuBaseProps['type']);

  const handleOpen = (goTo?: GoTo) => {
    if (goTo) {
      setGoTo(goTo);
    }
    open();
  };
  const context = {
    size,
    position,
    align,
    isOpen,
    open: handleOpen,
    close,
    goTo,
    setGoTo,
    type,
    id,
    buttonId,
    setButtonId,
    setHasItems,
  };

  const getButton = () => {
    const button = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && typeof child.type !== 'string' && child?.type === PopupMenuButton
    ) as React.ReactElement;

    if (button) {
      return React.cloneElement(button, { ...button.props, ref: buttonRef });
    } else {
      throw new Error('No PopupMenu.Button found');
    }
  };

  const getPanel = () => {
    const panel = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && typeof child.type !== 'string' && child?.type === PopupMenuPanel
    ) as React.ReactElement;
    console.log(panel);
    if (panel) {
      return panel;
    } else {
      throw new Error('No PopupMenu.Panel found');
    }
  };

  // const getItems = React.useMemo(() => {
  //   let foundAutofocus = false;
  //   const mapItem = (child: React.ReactNode): React.ReactNode => {
  //     if (React.isValidElement(child)) {
  //       if (child.type === PopupMenuItem) {
  //         return child;
  //       }

  //       if (child?.type === PopupMenuItems) {
  //         setHasItems(true);
  //       } else {
  //         if (!foundAutofocus) {
  //           if (child?.props?.autoFocus) {
  //             foundAutofocus = true;
  //             return React.cloneElement(child, { ...child.props, ref: focusRef });
  //           } else if (child?.props?.children) {
  //             const validKids = getValidChildren(child.props.children);
  //             if (validKids.length > 0) {
  //               const newKids = getValidChildren(child?.props?.children).map((child) => mapItem(child));
  //               if (newKids) {
  //                 return React.cloneElement(child, { ...child.props, children: newKids });
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //     return getValidChildren(child);
  //   };

  //   return getValidChildren(children)
  //     .filter((child) => child?.type !== PopupMenuButton)
  //     .map((child) => {
  //       return mapItem(child);
  //     });
  // }, [children]);

  // const handleKeyboard = (event: React.KeyboardEvent) => {
  //   switch (event.key) {
  //     case 'Escape':
  //       close();
  //       break;
  //     case 'Enter':
  //       const target = event.target as Element;
  //       if (target.nodeName.toLowerCase() !== 'input') {
  //         close();
  //       }
  //       break;
  //     case 'ArrowDown':
  //       event.preventDefault();
  //       event.stopPropagation();
  //       setGoTo(GoTo.First);
  //       break;
  //     case 'ArrowUp':
  //       event.preventDefault();
  //       event.stopPropagation();
  //       setGoTo(GoTo.Last);
  //       break;
  //   }
  // };

  // React.useEffect(() => {
  //   goTo && focusRef.current && focusRef.current.focus();
  //   setGoTo(undefined);
  // }, [focusRef, goTo]);

  return (
    <>
      <PopupMenuContext.Provider value={context}>
        {getButton()}
        {getPanel()}
        {/* {children} */}
        {/* <div
        onKeyDown={handleKeyboard}
        ref={internalRef}
        className={cx('sk-popup-menu', `sk-popup-menu-${size}`, className)}
        data-position={position}
        data-align={align}
        role={type}
        aria-labelledby={type ? buttonId : undefined}
        >
        {getItems}
      </div> */}
      </PopupMenuContext.Provider>
    </>
  );
};

if (__DEV__) {
  PopupMenuComponent.displayName = 'PopupMenuComponent';
}

export default PopupMenuComponent;
