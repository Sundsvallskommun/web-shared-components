import React from 'react';
import { useChat } from '../../hooks';
import { ChatInputSubmitButton } from './chat-input-submitbutton';
import { ChatInputTextarea, ChatInputTextareaProps } from './chat-input-textarea';
import { ChatInputWrapper } from './chat-input-wrapper';
import { ChatInputToolbar } from './toolbar/chat-input-toolbar';
import { handleMapToolbar } from './utils';

// TODO: Add default toolbar options. e.g. "dictate", "attachment"
type DefaultToolbar = '';

type ChatToolbar = DefaultToolbar | React.JSX.Element;
export type ChatToolbarGroup = Array<ChatToolbar> | ChatToolbar;

export interface ChatInputProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * Overrides the default send function
   */
  onSend?: (value: string) => void;
  /**
   * Overrides the internal value
   */
  value?: string;
  onChangeValue?: ChatInputTextareaProps['onChange'];
  /**
   * List of toolbar groups.
   * Each groups is seperated by a divider
   */
  toolbar?: ChatToolbarGroup[];
  disabled?: boolean;
  placeholder?: ChatInputTextareaProps['placeholder'];
  size?: 'sm' | 'md' | 'lg';
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>((props, ref) => {
  const [_value, setValue] = React.useState<string>('');
  const { onSend, value: propsValue, onChangeValue, toolbar, size, placeholder, textareaRef, ...rest } = props;
  const value = propsValue ?? _value;
  const { sendQuery } = useChat();

  const submitRef = React.useRef<HTMLButtonElement>(null);

  const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      submitRef?.current?.click();
    }
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeValue?.(event);
    setValue(event.target.value);
  };

  const handleSend = () => {
    if (onSend) {
      onSend(value);
    } else {
      sendQuery(value);
      setValue('');
    }
  };

  return (
    <ChatInputWrapper ref={ref} size={size} {...rest}>
      <ChatInputTextarea
        placeholder={placeholder}
        value={value}
        onChange={handleChangeValue}
        onKeyDown={handleEnter}
        ref={textareaRef}
      ></ChatInputTextarea>
      {toolbar ? (
        <ChatInputToolbar>
          {toolbar.map((group, index) => (
            <React.Fragment key={`toolbar-group-${index}`}>
              {handleMapToolbar(group, index, (toolbar?.length ?? 0) - 1)}
            </React.Fragment>
          ))}
        </ChatInputToolbar>
      ) : (
        <></>
      )}
      <ChatInputSubmitButton buttonRef={submitRef} onClick={() => handleSend()} />
    </ChatInputWrapper>
  );
});
