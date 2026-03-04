import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useChatInputTextareaClasses = createMemoClass((props) => {
  const sizes: Record<string, string> = {
    sm: 'sk-chat-input-textarea-sm',
    md: 'sk-chat-input-textarea-md',
    lg: 'sk-chat-input-textarea-lg',
  };

  const classes = cx('sk-chat-input-textarea', sizes[props?.size ?? 'md']);

  return classes;
});

export const useChatInputWrapperClasses = createMemoClass((props) => {
  const sizes: Record<string, string> = {
    sm: 'sk-chat-input-wrapper-sm',
    md: 'sk-chat-input-wrapper-md',
    lg: 'sk-chat-input-wrapper-lg',
  };

  const classes = cx('sk-chat-input-wrapper', sizes[props?.size ?? 'md']);

  return classes;
});

export const useChatInputSubmitButtonClasses = createMemoClass((props) => {
  const sizes: Record<string, string> = {
    sm: 'sk-chat-input-submitbutton-sm',
    md: 'sk-chat-input-submitbutton-md',
    lg: 'sk-chat-input-submitbutton-lg',
  };

  const classes = cx('sk-chat-input-submitbutton', sizes[props?.size ?? 'md']);

  return classes;
});

export const useChatInputToolbarClasses = createMemoClass((props) => {
  const sizes: Record<string, string> = {
    sm: 'sk-chat-input-toolbar-sm',
    md: 'sk-chat-input-toolbar-md',
    lg: 'sk-chat-input-toolbar-lg',
  };

  const classes = cx('sk-chat-input-toolbar', sizes[props?.size ?? 'md']);

  return classes;
});
