import { DefaultProps, cx, getValidChildren, useForkRef } from '@sk-web-gui/utils';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import React from 'react';
import { useSegmentedControl } from './use-segmented-control';

export interface SegmentedControlItemProps extends DefaultProps, React.ComponentPropsWithRef<'li'> {
  /** Set automatic by parent */
  menuIndex?: number;
  /** Use <a> or <button>. For dropdown, use <PopupMenu> */
  children: React.JSX.Element;
  /** For e.g. Next Links to work, they need to wrapped this way */
  wrapper?: React.JSX.Element;
  size?: 'md' | 'lg';
  disabled?: boolean;
}

export const SegmentedControlItem = React.forwardRef<HTMLLIElement, SegmentedControlItemProps>((props, ref) => {
  const { className, children, menuIndex, wrapper, size: _size, disabled: _disabled, ...rest } = props;

  const {
    selected,
    toggleItem,
    active,
    setActive,
    total,
    size: contextSize,
    disabled: contextDisabled,
  } = useSegmentedControl();

  const menuRef = React.useRef<HTMLElement>(null);
  const prevActiveRef = React.useRef<number | undefined>(undefined);
  const size = _size || contextSize || 'lg';
  const disabled = _disabled || contextDisabled;
  const isSelected = selected?.includes(menuIndex as number) ?? false;

  React.useEffect(() => {
    // Only focus when active changes (not on initial mount)
    if (prevActiveRef.current !== undefined && active === menuIndex && menuRef.current) {
      walkFocus(menuRef.current.children);
    }
    prevActiveRef.current = active;
  }, [active, menuIndex]);

  const walkFocus = (collection: HTMLCollection): boolean => {
    for (const element of Array.from(collection)) {
      if (element.getAttribute('role') === 'button') {
        (element as HTMLElement).focus();
        return true;
      }
      if (element.children && walkFocus(element.children)) {
        return true;
      }
    }
    return false;
  };

  const handleKeyboard = (event: React.KeyboardEvent) => {
    if (disabled) return;

    const currentIndex = menuIndex as number;
    const itemCount = total || 0;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      const newIndex = currentIndex === 0 ? itemCount - 1 : currentIndex - 1;
      setActive?.(newIndex);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      const newIndex = currentIndex === itemCount - 1 ? 0 : currentIndex + 1;
      setActive?.(newIndex);
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      toggleItem?.(currentIndex);
    }
  };

  const handleClick = () => {
    if (disabled) return;
    toggleItem?.(menuIndex as number);
  };

  const getClonedChild = (child: React.JSX.Element): React.ReactNode => {
    if (child.type === React.Fragment) {
      const grandchildren = getValidChildren(child.props.children).map((grandchild, index) => {
        return index === 0 ? getClonedChild(grandchild) : grandchild;
      });
      return React.cloneElement(child, { ...child.props, children: grandchildren });
    } else if (child.type === PopupMenu) {
      const grandchildren = getValidChildren(child.props.children).map((grandchild) => {
        if (grandchild.type === PopupMenu.Button) {
          return getClonedChild(grandchild);
        }
        return grandchild;
      });

      return React.cloneElement(child, { ...child.props, children: grandchildren });
    } else {
      return React.cloneElement(child, {
        ...child.props,
        onKeyDown: handleKeyboard,
        onClick: handleClick,
        role: 'button',
        'aria-pressed': isSelected ? 'true' : 'false',
        'aria-disabled': disabled ? 'true' : undefined,
        tabIndex: disabled ? -1 : active === menuIndex ? 0 : -1,
      });
    }
  };

  const getChildWithWrapper = () => {
    if (wrapper) {
      return React.cloneElement(wrapper, { ...wrapper.props, children: getClonedChild(children) });
    } else {
      return getClonedChild(children);
    }
  };

  return (
    <li
      data-size={size}
      aria-disabled={disabled ?? undefined}
      ref={useForkRef(ref, menuRef)}
      className={cx('sk-segmentedcontrol-item', className)}
      role="none"
      {...rest}
    >
      {getChildWithWrapper()}
    </li>
  );
});
