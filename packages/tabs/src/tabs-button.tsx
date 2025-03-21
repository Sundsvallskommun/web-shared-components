import Button from '@sk-web-gui/button';
import Divider from '@sk-web-gui/divider';
import { DefaultProps, cx, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { defaultTabsContext } from './context';
import { useTabs } from './use-tabs';

export interface TabsButtonProps extends DefaultProps, Omit<React.ComponentPropsWithoutRef<typeof Button>, 'color'> {
  /** Color for menuoption. Is inherited from MenuBar */
  color?: 'tertiary' | 'juniskar' | 'bjornstigen' | 'gronsta' | 'vattjom' | string;
  /** Set true if this is the current menuoption. Can be handled by MenuBar */
  current?: boolean;
  /** Set automatic */
  menuIndex?: number;
  /** Set automatic */
  'aria-controls'?: string;
}

export const TabsButton = React.forwardRef<HTMLLIElement, TabsButtonProps>((props, ref) => {
  const {
    color: propsColor,
    size,
    className,
    current: thisCurrent,
    children,
    menuIndex,
    'aria-controls': ariaControls,
    onClick,
    id,
    'aria-disabled': disabled = false,
    ...rest
  } = props;
  const { color: contextColor, current, setCurrent, next, prev, active } = useTabs();
  const [mounted, setMounted] = React.useState<boolean>(false);
  const color = propsColor || contextColor || defaultTabsContext.color;
  const menuRef = React.useRef<HTMLElement>(null);
  const isActive = active === menuIndex;
  const isCurrent = current === menuIndex;

  React.useEffect(() => {
    if (thisCurrent && typeof menuIndex === 'number') {
      setCurrent?.(menuIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisCurrent]);

  React.useEffect(() => {
    if (mounted) {
      if (active === menuIndex) {
        if (menuRef.current) {
          walkFocus(menuRef.current.children);
        }
      }
    } else {
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  React.useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  const setFocus = (element: Element): boolean => {
    if (element) {
      if (element.getAttribute('role') === 'tab') {
        (element as HTMLElement).focus();
        return true;
      }
    }
    return false;
  };

  const walkFocus = (collection: HTMLCollection): boolean => {
    let focused = false;
    const elements = Array.from(collection);
    for (let index = 0; index < elements.length; index++) {
      if (!focused) {
        focused = setFocus(elements[index]);
        if (!focused && elements[index].children) {
          focused = walkFocus(elements[index].children);
        }
        if (focused) {
          break;
        }
      } else {
        break;
      }
    }

    return focused;
  };

  const handleKeyboard: React.KeyboardEventHandler = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      prev?.();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      next?.();
    }
  };

  return (
    <li
      data-color={color}
      data-current={isCurrent ? isCurrent : undefined}
      data-active={isActive ? isActive : undefined}
      data-size={size}
      ref={useForkRef(ref, menuRef)}
      className={cx('sk-tabs-list-item', className)}
      role="none"
      id={id}
    >
      <Button
        className="sk-tabs-list-item-button"
        aria-disabled={disabled}
        onKeyDown={handleKeyboard}
        onClick={!disabled ? (onClick ? onClick : () => setCurrent?.(menuIndex as number)) : undefined}
        role="tab"
        aria-selected={isCurrent}
        tabIndex={isCurrent ? 0 : -1}
        aria-controls={ariaControls}
        size={size}
        {...rest}
        variant="ghost"
      >
        <span>{children}</span>
        
      </Button>
      <div className="sk-tabs-list-item-divider" />
    </li>
    
  );
});
