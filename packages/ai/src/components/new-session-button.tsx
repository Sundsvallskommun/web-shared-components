import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import React from 'react';

export interface NewSessionButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  helperText?: string;
  wrapperClassName?: string;
  helperTextClassName?: string;
  icon?: JSX.Element;
}

export const NewSessionButton = React.forwardRef<HTMLButtonElement, NewSessionButtonProps>((props, ref) => {
  const {
    helperText: _helperText,
    icon: _icon,
    wrapperClassName,
    helperTextClassName,
    children,
    className,
    ...rest
  } = props;

  const helperText =
    _helperText ?? '💡 För att få relevanta svar på frågor som rör andra ämnen behöver du starta en ny konversation.';

  const icon = _icon ?? <Icon name="plus" />;

  return (
    <div className={cx('sk-ai-newsession', wrapperClassName)}>
      <Button
        type="button"
        variant="tertiary"
        size="sm"
        className={cx('sk-ai-newsession-button', className)}
        ref={ref}
        leftIcon={icon}
        {...rest}
      >
        {children ?? 'Ny konversation'}
      </Button>

      {helperText && <div className={cx('sk-ai-newsession-helpertext', helperTextClassName)}>{helperText}</div>}
    </div>
  );
});
