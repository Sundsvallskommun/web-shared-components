import { Button, ButtonProps } from '@sk-web-gui/button';
import React from 'react';
import { GoTo, usePopupMenu } from './popupmenu-context';

export type PopupMenuButtonProps = Omit<React.ComponentPropsWithoutRef<ButtonProps['Component']>, 'ref'>;

export const PopupMenuButton = React.forwardRef<HTMLButtonElement, PopupMenuButtonProps>((props, ref) => {
  const { disabled: _disabled, loading, children, className, onClick, onKeyDown, id: _id, ...rest } = props;
  const disabled = _disabled || loading;

  const { isOpen, open, close, type, id: parentId, setButtonId, position } = usePopupMenu();

  const id = _id || `${parentId}-button`;

  React.useEffect(() => {
    setButtonId?.(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      close?.();
    } else {
      open?.();
    }
    onClick?.(event);
  };

  const handleKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'Escape':
        close?.();
        break;
      case 'Enter':
        event.preventDefault();
        event.stopPropagation();
        if (open && close) {
          if (isOpen) {
            close();
          } else {
            open(GoTo.First);
          }
        }
        break;
      case 'ArrowDown':
        if (position === 'over' || position === 'under') {
          event.preventDefault();
          event.stopPropagation();
          open?.(GoTo.First);
        }
        break;
      case 'ArrowUp':
        if (position === 'over' || position === 'under') {
          event.preventDefault();
          event.stopPropagation();
          open?.(GoTo.Last);
        }
        break;
      case 'ArrowRight':
        if (position === 'right') {
          event.preventDefault();
          event.stopPropagation();
          open?.(GoTo.First);
        }
        break;
      case 'ArrowLeft':
        if (position === 'left') {
          event.preventDefault();
          event.stopPropagation();
          open?.(GoTo.First);
        }
        break;
    }
    onKeyDown?.(event);
  };
  return (
    <Button
      ref={ref}
      className={className}
      disabled={disabled}
      aria-haspopup={type || 'menu'}
      aria-expanded={isOpen}
      id={id}
      {...rest}
      onKeyDown={handleKeyboard}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
});
