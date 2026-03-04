import { Textarea } from '@sk-web-gui/forms';
import { cx, getValidChildren } from '@sk-web-gui/utils';
import React, { cloneElement } from 'react';
import { useChatInputWrapperClasses } from './styles';
import { ChatInputToolbar, ChatInputToolbarProps } from './toolbar/chat-input-toolbar';
import { ChatInputTextarea, ChatInputTextareaProps } from './chat-input-textarea';
import { ChatInputSubmitButton, ChatInputSubmitButtonProps } from './chat-input-submitbutton';

export type ChatInputWrapperProps = Omit<React.ComponentPropsWithRef<(typeof Textarea)['Group']>, 'readOnly'>;

export const ChatInputWrapper = React.forwardRef<HTMLDivElement, ChatInputWrapperProps>((props, ref) => {
  const { className, children, ...rest } = props;
  const classes = useChatInputWrapperClasses({ size: props?.size });
  const validChildren = getValidChildren(children);
  const hasToolbar = validChildren.some(
    (child) => React.isValidElement<ChatInputToolbarProps>(child) && child.type === ChatInputToolbar
  );

  return (
    <Textarea.Group ref={ref} className={cx(classes, className)} {...rest}>
      {validChildren.map((child) => {
        if (React.isValidElement<ChatInputTextareaProps>(child) && child.type === ChatInputTextarea) {
          return cloneElement(child, {
            ...child.props,
            size: child?.props?.size ?? props?.size,
            disabled: child?.props?.disabled ?? props?.disabled,
            wrap: child.props?.wrap ?? (hasToolbar || 'auto'),
          });
        }
        if (React.isValidElement<ChatInputSubmitButtonProps>(child) && child.type === ChatInputSubmitButton) {
          return cloneElement(child, {
            ...child.props,
            size: child?.props?.size ?? props?.size,
            disabled: child?.props?.disabled ?? props?.disabled,
          });
        }
        if (React.isValidElement<ChatInputToolbarProps>(child) && child.type === ChatInputToolbar) {
          return cloneElement(child, {
            ...child.props,
            size: child?.props?.size ?? props?.size,
            disabled: child?.props?.disabled ?? props?.disabled,
          });
        }
        return child;
      })}
    </Textarea.Group>
  );
});
