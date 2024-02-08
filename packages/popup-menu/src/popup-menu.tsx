import { DefaultProps, __DEV__, cx, getValidChildren, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { PopupMenuButton } from './popup-menu-button';
import { PopupMenuContext } from './popupmenu-context';
import { useOnClickOutside } from 'usehooks-ts';
import { PopupMenuItems } from './popup-menu-items';
import { PopupMenuItem } from './popup-menu-item';

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

export interface PopupMenuComponentProps
  extends PopupMenuBaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'type'>,
    DefaultProps {}

export const PopupMenuComponent = React.forwardRef<HTMLDivElement, PopupMenuComponentProps>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [goTo, setGoTo] = React.useState<'first' | 'last' | undefined>();
  const [hasItems, setHasItems] = React.useState<boolean>(false);
  const {
    className,
    children,
    size = 'md',
    position = 'under',
    align = 'start',
    type: _type,
    id: _id,
    ...rest
  } = props;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const focusRef = React.useRef<HTMLElement>(null);
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

  const context = {
    size,
    position,
    align,
    isOpen,
    open,
    close,
    goTo,
    type,
    id,
  };

  const getButton = () => {
    const button = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && typeof child.type !== 'string' && child?.type === PopupMenuButton
    ) as React.ReactElement;

    if (button) {
      return React.cloneElement(button, { ...button.props, ref: buttonRef, ...rest });
    } else {
      throw new Error('No PopupMenu.Button found');
    }
  };

  const getItems = React.useMemo(() => {
    let foundAutofocus = false;
    const mapItem = (child: React.ReactNode): React.ReactNode => {
      if (React.isValidElement(child)) {
        if (child.type === PopupMenuItem) {
          return child;
        }
        // console.log(`type ${child?.type?.displayName}: `, child.type);
        if (child?.type === PopupMenuItems) {
          console.log('FOUND ITEMS', child);
          setHasItems(true);
        } else {
          if (!foundAutofocus) {
            if (child?.props?.autoFocus) {
              console.log('FOUND autofocus: ', child);
              foundAutofocus = true;
              return React.cloneElement(child, { ...child.props, ref: focusRef });
            } else if (child?.props?.children) {
              const validKids = getValidChildren(child.props.children);
              console.log('validKids: ', validKids);
              // console.log('kids: ', validKids);
              if (validKids.length > 0) {
                const newKids = getValidChildren(child?.props?.children).map((child) => mapItem(child));

                console.log('newKids: ', newKids);
                if (newKids) {
                  return React.cloneElement(child, { ...child.props, children: newKids });
                }
              }
            }
          }
        }
      }
      return getValidChildren(child);
    };

    return getValidChildren(children)
      .filter((child) => child?.type !== PopupMenuButton)
      .map((child) => {
        return mapItem(child);
      });
  }, [children]);

  const handleKeyboard = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();
        setGoTo('first');
        setTimeout(() => {
          setGoTo(undefined);
        }, 10);
        break;
      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();
        setGoTo('last');
        setTimeout(() => {
          setGoTo(undefined);
        }, 10);
        break;
    }
  };

  React.useEffect(() => {
    focusRef.current && focusRef.current.focus();
  }, [isOpen]);

  return (
    <PopupMenuContext.Provider value={context}>
      {getButton()}
      <div
        onKeyDown={handleKeyboard}
        ref={useForkRef(ref, internalRef)}
        className={cx('sk-popup-menu', `sk-popup-menu-${size}`, className, isOpen ? 'visible' : 'invisible')}
        data-position={position}
        data-align={align}
        role={type}
      >
        {getItems}
      </div>
    </PopupMenuContext.Provider>
  );
});

//TODO: Add function for expandable menues.

export const PopupMenuGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'> & DefaultProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <div role="group" ref={ref} className={cx('sk-popup-menu-group', className)} {...rest} />;
  }
);

if (__DEV__) {
  PopupMenuComponent.displayName = 'PopupMenuComponent';
}

export default PopupMenuComponent;
