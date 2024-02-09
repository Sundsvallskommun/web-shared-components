import React from 'react';
import { GoTo, usePopupMenu } from './popupmenu-context';
import { cx, getValidChildren } from '@sk-web-gui/utils';
import { PopupMenuBaseProps } from './popup-menu';
import { PopupMenuItem } from './popup-menu-item';
import { PopupMenuItems } from './popup-menu-items';
import { PopupMenuButton } from './popup-menu-button';

interface PopupMenuPanelProps extends Omit<PopupMenuBaseProps, 'type'>, React.ComponentPropsWithoutRef<'div'> {}

export const PopupMenuPanel = React.forwardRef<HTMLDivElement, PopupMenuPanelProps>((props, ref) => {
  const { size, position, align, className, children, ...rest } = props;
  const { setGoTo, type, buttonId, setHasItems, goTo, isOpen, close, ...context } = usePopupMenu();
  const focusRef = React.useRef<HTMLElement>(null);
  const [mounted, setMounted] = React.useState<boolean>(false);

  const handleKeyboard = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        close && close();
        break;
      case 'Enter':
        const target = event.target as Element;
        if (target.nodeName.toLowerCase() !== 'input') {
          close && close();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();
        setGoTo && setGoTo(GoTo.First);
        break;
      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();
        setGoTo && setGoTo(GoTo.Last);
        break;
    }
  };

  const items = React.useMemo(() => {
    let foundAutofocus = false;
    const mapItem = (child: React.ReactNode): React.ReactNode => {
      if (React.isValidElement(child)) {
        if (child.type === PopupMenuItem) {
          return child;
        }

        if (child?.type === PopupMenuItems) {
          setHasItems && setHasItems(true);
        } else {
          if (!foundAutofocus) {
            if (child?.props?.autoFocus) {
              foundAutofocus = true;
              return React.cloneElement(child, { ...child.props, ref: focusRef });
            } else if (child?.props?.children) {
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
    };

    return getValidChildren(children)
      .filter((child) => child?.type !== PopupMenuButton)
      .map((child) => {
        return mapItem(child);
      });
  }, [children]);

  React.useEffect(() => {
    goTo && focusRef.current && focusRef.current.focus();
    setGoTo && setGoTo(undefined);
  }, [focusRef, goTo]);

  React.useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return (
    <div
      onKeyDown={handleKeyboard}
      ref={ref}
      className={cx('sk-popup-menu', `sk-popup-menu-${size || context.size}`, className)}
      data-position={position || context.position}
      data-align={align || context.align}
      role={type}
      data-open={isOpen}
      aria-labelledby={type ? buttonId : undefined}
      {...rest}
    >
      {mounted && items}
    </div>
  );
});
