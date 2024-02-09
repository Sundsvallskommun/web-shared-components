import { Button, ButtonProps } from '@sk-web-gui/button';
import React from 'react';
import { GoTo, usePopupMenu } from './popupmenu-context';

export const PopupMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<ButtonProps['Component']>
>((props, ref) => {
  const {
    disabled: _disabled,
    loading,
    active,
    iconButton,
    children,
    className,
    color,
    rounded = false,
    inverted,
    onClick,
    onKeyDown,
    id: _id,
    ...rest
  } = props;
  const disabled = _disabled || loading;

  const { isOpen, open, close, type, id: parentId, setButtonId } = usePopupMenu();

  const id = _id || `${parentId}-button`;

  React.useEffect(() => {
    setButtonId && setButtonId(id);
  }, [id]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      close && close();
    } else {
      open && open();
    }
    onClick && onClick(event);
  };

  const handleKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'Escape':
        close && close();
        break;
      case 'Enter':
        event.preventDefault();
        if (open && close) {
          if (isOpen) {
            close();
          } else {
            open(GoTo.First);
          }
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        open && open(GoTo.First);
        break;
      case 'ArrowUp':
        event.preventDefault();
        open && open(GoTo.Last);
        break;
    }
    onKeyDown && onKeyDown(event);
  };
  return (
    <Button
      ref={ref}
      data-rounded={rounded ? rounded : undefined}
      data-active={active ? 'true' : undefined}
      data-color={color ? color : undefined}
      data-icon={iconButton ? iconButton : undefined}
      data-inverted={inverted ? inverted : undefined}
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
