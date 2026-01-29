import Button from '@sk-web-gui/button';
import React, { useEffect } from 'react';
import { useChatInputToolbar } from './chat-input-toolbar-context';
import { cx, useForkRef } from '@sk-web-gui/utils';
import Tooltip from '@sk-web-gui/tooltip';

export interface ChatInputToolbarButtonProps extends React.ComponentPropsWithRef<typeof Button> {
  index?: number;
  pressed?: boolean;
  label?: string;
}

export const ChatInputToolbarButton = React.forwardRef<HTMLButtonElement, ChatInputToolbarButtonProps>((props, ref) => {
  const [hover, setHover] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState<boolean>(false);
  const {
    className,
    onKeyDown,
    index = 0,
    pressed,
    label,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;
  const { active, setActive, prev, next, delayedHover, setDelayedHover, ...context } = useChatInputToolbar();
  const size = context.size === 'lg' ? 'md' : 'sm';
  const disabled = context.disabled;
  const internalRef = React.useRef<HTMLButtonElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    switch (event.key) {
      case 'ArrowRight':
        next?.();
        break;
      case 'ArrowLeft':
        prev?.();
        break;
      case 'Enter':
        setActive?.(index);
        break;
      case 'Space':
        setActive?.(index);
        break;
    }
  };

  useEffect(() => {
    if (active === index && mounted) {
      internalRef?.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, index]);

  useEffect(() => {
    // NOTE: Dont focus on first button on render
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnter?.(event);
    setDelayedHover?.(true);
    setHover(true);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(event);
    setDelayedHover?.(false);
    setHover(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    onFocus?.(event);
    setDelayedHover?.(true);
    setHover(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    onBlur?.(event);
    setDelayedHover?.(false);
    setHover(false);
  };

  return (
    <div className="sk-chat-input-toolbar-button-wrapper">
      {label && hover && delayedHover && (
        <Tooltip position="above" className="sk-chat-input-toolbar-button-tooltip">
          {label}
        </Tooltip>
      )}
      <Button
        role="menuitem"
        tabIndex={active === index ? 0 : -1}
        aria-pressed={pressed}
        aria-label={label}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        className={cx('sk-chat-input-toolbar-button', className)}
        size={size}
        variant={pressed ? 'primary' : 'tertiary'}
        iconButton
        ref={useForkRef(ref, internalRef)}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
});
