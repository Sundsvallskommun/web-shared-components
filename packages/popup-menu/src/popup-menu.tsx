import { __DEV__, useForkRef } from '@sk-web-gui/utils';
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
   * @default menu
   */
  type?: 'dialog' | 'menu';
  /**
   * This will flip the alignment if the panel doesn't fit on screen
   * @default true
   */
  autoAlign?: boolean;
  /**
   * This will flip the position (under and over, left and right) if the panel doesn't fit on screen
   * @default false
   */
  autoPosition?: boolean;
}

export interface PopupMenuComponentProps extends PopupMenuBaseProps {
  /**
   * PopupMenu.Button & PopupMenu.Panel
   */
  children:
    | [React.ReactComponentElement<typeof PopupMenuButton>, React.ReactComponentElement<typeof PopupMenuPanel>]
    | React.ReactComponentElement<typeof PopupMenuPanel>;

  id?: string;
  /**
   * Set true to open the menu
   * @default false
   */
  open?: boolean;
  /**
   * Returns true or false when menu is opened or closed
   */
  onToggleOpen?: (open: boolean) => void;
}

export const PopupMenuComponent: React.FC<PopupMenuComponentProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [goTo, setGoTo] = React.useState<GoTo | undefined>();
  const [buttonId, setButtonId] = React.useState<string>();
  const {
    children,
    size = 'md',
    position = 'under',
    align = 'start',
    type = 'dialog',
    id: _id,
    open: _open,
    onToggleOpen,
    autoAlign = true,
    autoPosition = false,
  } = props;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const internalRef = React.useRef<HTMLDivElement>(null);
  const autoId = React.useId();

  const id = _id || `sk-popup-menu-${autoId}`;
  const open = () => {
    setIsOpen(true);
    onToggleOpen && onToggleOpen(true);
  };

  const close = (focusButton?: boolean) => {
    setIsOpen(false);
    onToggleOpen && onToggleOpen(false);
    if (focusButton) {
      buttonRef.current && buttonRef.current.focus();
    }
  };

  React.useEffect(() => {
    if (_open) {
      open();
    } else {
      close();
    }
  }, [_open]);

  useOnClickOutside(internalRef, (event: MouseEvent | TouchEvent) => {
    const target = event.target as Node;
    const isOutsideButton = buttonRef.current && !buttonRef.current.contains(target);
    if (isOutsideButton) {
      close();
    }
  });

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
    autoAlign,
    autoPosition,
  };

  const getButton = React.useCallback(() => {
    const button = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && typeof child.type !== 'string' && child?.type === PopupMenuButton
    ) as React.ReactElement;

    if (button) {
      return React.cloneElement(button, {
        ...button.props,
        ref: button.props.ref ? useForkRef(button.props.ref, buttonRef) : buttonRef,
      });
    }
  }, [children]);

  const getPanel = React.useCallback(() => {
    const panel = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && typeof child.type !== 'string' && child?.type === PopupMenuPanel
    ) as React.ReactElement;
    if (panel) {
      return React.cloneElement(panel, {
        ...panel.props,
        ref: panel.props.ref ? useForkRef(panel.props.ref, internalRef) : internalRef,
      });
    } else {
      throw new Error('No PopupMenu.Panel found');
    }
  }, [children]);

  return (
    <>
      <PopupMenuContext.Provider value={context}>
        {getButton()}
        {getPanel()}
      </PopupMenuContext.Provider>
    </>
  );
};

if (__DEV__) {
  PopupMenuComponent.displayName = 'PopupMenuComponent';
}

export default PopupMenuComponent;
