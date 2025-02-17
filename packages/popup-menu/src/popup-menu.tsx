import { __DEV__, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { PopupMenuButton, PopupMenuButtonProps } from './popup-menu-button';
import { PopupMenuPanel, PopupMenuPanelProps } from './popup-menu-panel';
import { GoTo, PopupMenuContext } from './popupmenu-context';

interface GetButtonProps {
  children: React.ReactNode;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}
const GetButton: React.FC<GetButtonProps> = ({ children, buttonRef }) => {
  const button = React.Children.toArray(children).find(
    (child) => React.isValidElement<PopupMenuButtonProps>(child) && child?.type === PopupMenuButton
  );
  const returnButtonRef = useForkRef<PopupMenuButtonProps>(
    React.isValidElement<PopupMenuButtonProps>(button) ? button?.props?.ref : null,
    buttonRef
  );

  if (button && React.isValidElement<PopupMenuButtonProps>(button)) {
    return React.cloneElement(button, {
      ...button.props,
      ref: button.props.ref ? returnButtonRef : buttonRef,
    });
  } else {
    return null;
  }
};

interface GetPanelProps {
  children: React.ReactNode;
  internalRef: React.RefObject<HTMLDivElement | null>;
}
const GetPanel: React.FC<GetPanelProps> = ({ children, internalRef }) => {
  const panel = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement<typeof PopupMenuPanel>(child) &&
      typeof child.type !== 'string' &&
      child?.type === PopupMenuPanel
  ) as React.ReactElement;
  const returnPanelRef = useForkRef(
    React.isValidElement<PopupMenuPanelProps>(panel) ? panel?.props?.ref : null,
    internalRef
  );

  if (panel && React.isValidElement<PopupMenuPanelProps>(panel)) {
    return React.cloneElement(panel, {
      ...panel.props,
      ref: panel.props.ref ? returnPanelRef : internalRef,
    });
  } else {
    throw new Error('No PopupMenu.Panel found');
  }
};

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
    onToggleOpen?.(true);
  };

  const close = (focusButton?: boolean) => {
    setIsOpen(false);
    onToggleOpen?.(false);
    if (focusButton) {
      buttonRef.current?.focus();
    }
  };

  React.useEffect(() => {
    if (_open) {
      open();
    } else {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_open]);

  //NOTE: Cast to RefObject<HTMLDivElement> to avoid type error because of bug in usehooks-ts
  //Remove this when the bug is fixed
  useOnClickOutside(internalRef as React.RefObject<HTMLElement>, (event: MouseEvent | TouchEvent | FocusEvent) => {
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

  return (
    <>
      <PopupMenuContext.Provider value={context}>
        <GetButton buttonRef={buttonRef}>{children}</GetButton>
        <GetPanel internalRef={internalRef}>{children}</GetPanel>
      </PopupMenuContext.Provider>
    </>
  );
};

if (__DEV__) {
  PopupMenuComponent.displayName = 'PopupMenuComponent';
}

export default PopupMenuComponent;
