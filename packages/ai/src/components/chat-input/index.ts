import { ChatInput as InternalChatInput, type ChatInputProps as InternalChatInputProps } from './chat-input';
import { ChatInputSubmitButton } from './chat-input-submitbutton';
import { ChatInputTextarea } from './chat-input-textarea';
import { ChatInputWrapper } from './chat-input-wrapper';
import { ChatInputToolbar } from './toolbar';

interface ChatInputProps extends React.ForwardRefExoticComponent<InternalChatInputProps> {
  Component: typeof InternalChatInput;
  Wrapper: typeof ChatInputWrapper;
  Textarea: typeof ChatInputTextarea;
  Toolbar: typeof ChatInputToolbar;
  Submitbutton: typeof ChatInputSubmitButton;
}

export const ChatInput = {
  ...InternalChatInput,
  Component: InternalChatInput,
  Wrapper: ChatInputWrapper,
  Textarea: ChatInputTextarea,
  Toolbar: ChatInputToolbar,
  Submitbutton: ChatInputSubmitButton,
} as ChatInputProps;

export type { ChatInputProps };
