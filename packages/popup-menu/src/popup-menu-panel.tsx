import { cx, Dict, getValidChildren, useForkRef, useOnElementOutside } from '@sk-web-gui/utils';
import React from 'react';
import { PopupMenuBaseProps } from './popup-menu';
import { PopupMenuButton } from './popup-menu-button';
import { PopupMenuItem } from './popup-menu-item';
import { PopupMenuItems } from './popup-menu-items';
import { GoTo, usePopupMenu } from './popupmenu-context';

interface GetItemProps {
  child: React.ReactElement<{ ref?: React.Ref<HTMLElement> }>;
  focusRef: React.RefObject<HTMLElement | null>;
}

function GetItem({ child, focusRef }: GetItemProps): React.ReactNode {
  const itemRef = useForkRef<HTMLElement>(child?.props?.ref, focusRef);

  return React.cloneElement(child, {
    ...child.props,
    ref: child.props.ref ? itemRef || undefined : focusRef,
  });
}

interface GetItems {
  children: React.ReactNode;
  focusRef: React.RefObject<HTMLElement | null>;
}
const GetItems: React.FC<GetItems> = ({ children, focusRef }) => {
  const [foundAutofocus, setFoundAutofocus] = React.useState(false);

  const mapItem = React.useCallback(
    (child: React.ReactNode): React.ReactNode => {
      if (React.isValidElement(child)) {
        if (child.type === PopupMenuItem) {
          return child;
        }

        if (child?.type !== PopupMenuItems) {
          if (!foundAutofocus) {
            if (React.isValidElement<Dict>(child) && 'autoFocus' in child.props) {
              setFoundAutofocus(true);
              return <GetItem child={child} focusRef={focusRef} />;
            } else if (React.isValidElement<React.PropsWithChildren>(child) && child?.props?.children) {
              const validKids = getValidChildren(child.props.children);
              if (validKids.length > 0) {
                const newKids = getValidChildren(child?.props?.children).map((child) => mapItem(child));
                if (newKids) {
                  return React.cloneElement(child, { ...child.props, children: newKids });
                }
              }
            }
          }
        }
      }
      return getValidChildren(child);
    },
    [foundAutofocus, focusRef]
  );

  return getValidChildren(children)
    .filter((child) => child?.type !== PopupMenuButton)
    .map((child) => {
      return mapItem(child);
    });
};

export interface PopupMenuPanelProps extends Omit<PopupMenuBaseProps, 'type'>, React.ComponentPropsWithRef<'div'> {}

export const PopupMenuPanel = React.forwardRef<HTMLDivElement, PopupMenuPanelProps>((props, ref) => {
  const {
    size,
    position: _position,
    align: _align,
    className,
    children,
    autoAlign: _autoAlign,
    autoPosition: _autoPosition,
    ...rest
  } = props;
  const { setGoTo, type, buttonId, goTo, isOpen, close, ...context } = usePopupMenu();
  const focusRef = React.useRef<HTMLElement>(null);
  const internalRef = React.useRef<HTMLDivElement>(null);
  const requestedAlign: PopupMenuBaseProps['align'] = _align || context.align || 'start';
  const requestedPosition: PopupMenuBaseProps['position'] = _position || context.position || 'under';
  const [align, setAlign] = React.useState<PopupMenuBaseProps['align']>(requestedAlign);
  const [position, setPosition] = React.useState<PopupMenuBaseProps['position']>(requestedPosition);
  const autoAlign = _autoAlign !== undefined ? _autoAlign : context.autoAlign !== undefined ? context.autoAlign : true;
  const autoPosition =
    _autoPosition !== undefined ? _autoPosition : context.autoPosition !== undefined ? context.autoPosition : true;

  React.useEffect(() => {
    if (_align) {
      setAlign(_align);
    } else if (context.align) {
      setAlign(context.align);
    } else {
      setAlign('start');
    }
  }, [_align, context.align]);

  React.useEffect(() => {
    if (_position) {
      setPosition(_position);
    } else if (context.position) {
      setPosition(context.position);
    } else {
      setPosition('under');
    }
  }, [_position, context.position]);

  useOnElementOutside(
    internalRef,
    ({ isOutsideTop, isOutsideBottom, isOutsideLeft, isOutsideRight }) => {
      if (autoAlign) {
        if (position === 'over' || position === 'under') {
          switch (requestedAlign) {
            case 'start':
              setAlign(isOutsideRight ? 'end' : 'start');
              break;
            case 'end':
              setAlign(isOutsideLeft ? 'start' : 'end');
              break;
          }
        }
        if (position === 'left' || position === 'right') {
          switch (requestedAlign) {
            case 'start':
              setAlign(isOutsideBottom ? 'end' : 'start');
              break;
            case 'end':
              setAlign(isOutsideTop ? 'start' : 'end');
              break;
          }
        }
      }
    },
    [isOpen, autoAlign, requestedAlign]
  );

  useOnElementOutside(
    internalRef,
    ({ isOutsideTop, isOutsideBottom, isOutsideLeft, isOutsideRight }) => {
      if (autoPosition) {
        switch (requestedPosition) {
          case 'under':
            setPosition(isOutsideBottom ? 'over' : 'under');
            break;
          case 'over':
            setPosition(isOutsideTop ? 'under' : 'over');
            break;
          case 'left':
            setPosition(isOutsideLeft ? 'right' : 'left');
            break;
          case 'right':
            setPosition(isOutsideRight ? 'left' : 'right');
            break;
        }
      }
    },
    [isOpen, autoPosition, requestedPosition]
  );

  const handleKeyboard = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        event.stopPropagation();
        close?.(true);
        break;
      case 'Enter': {
        const target = event.target as Element;
        if (target.nodeName.toLowerCase() !== 'input') {
          close?.();
        }
        break;
      }
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();
        setGoTo?.(GoTo.First);
        break;
      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();
        setGoTo?.(GoTo.Last);
        break;
      case 'ArrowRight':
        if (position === 'left') {
          event.preventDefault();
          event.stopPropagation();
          close?.(true);
        }
        break;
      case 'ArrowLeft':
        if (position === 'right') {
          event.preventDefault();
          event.stopPropagation();
          close?.(true);
        }
        break;
    }
  };

  React.useEffect(() => {
    if (isOpen && goTo && focusRef.current) {
      setGoTo?.(undefined);
      focusRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div
      onKeyDown={handleKeyboard}
      ref={useForkRef(ref, internalRef)}
      className={cx('sk-popup-menu', `sk-popup-menu-${size || context.size}`, className)}
      data-position={position}
      data-align={align}
      role={type}
      data-open={isOpen}
      aria-labelledby={type ? buttonId : undefined}
      {...rest}
    >
      <GetItems focusRef={focusRef}>{children}</GetItems>
    </div>
  );
});
