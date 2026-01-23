import Button from '@sk-web-gui/button';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { ChatInputWrapperProps } from './chat-input-wrapper';
import { useChatInputSubmitButtonClasses } from './styles';
import Icon from '@sk-web-gui/icon';
import { Send } from 'lucide-react';
import Tooltip from '@sk-web-gui/tooltip';

export interface ChatInputSubmitButtonProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onClick'>,
    Pick<React.ComponentPropsWithRef<'button'>, 'onClick' | 'disabled' | 'type'> {
  size?: ChatInputWrapperProps['size'];
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

export const ChatInputSubmitButton = React.forwardRef<HTMLDivElement, ChatInputSubmitButtonProps>((props, ref) => {
  const { className, children, size, onClick, buttonRef, disabled, type = 'button', ...rest } = props;
  const [hover, setHover] = React.useState<boolean>(false);
  const timeout = React.useRef<NodeJS.Timeout>(null);

  const classes = useChatInputSubmitButtonClasses({ size });

  const setDelayedHover = () => {
    if (!timeout.current) {
      timeout.current = setTimeout(() => {
        setHover(true);
      }, 2000);
    }
  };

  const cancelHover = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = null;
    setHover(false);
  };

  const handleMouseEnter = () => {
    setDelayedHover();
  };

  const handleMouseLeave = () => {
    cancelHover();
  };

  const handleFocus = () => {
    setDelayedHover();
  };

  const handleBlur = () => {
    cancelHover();
  };

  return (
    <div ref={ref} className={cx(classes, className)} {...rest}>
      {children ?? (
        <div className="sk-chat-input-submitbutton-inner-wrapper">
          {hover && (
            <Tooltip className="sk-chat-input-submitbutton-tooltip" position="left">
              Skicka
            </Tooltip>
          )}
          <Button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            iconButton
            disabled={disabled}
            aria-label="Skicka"
            size={size === 'lg' ? 'md' : 'sm'}
            onClick={onClick}
            type={type}
            ref={buttonRef}
          >
            <Icon icon={<Send />} />
          </Button>
        </div>
      )}
    </div>
  );
});
